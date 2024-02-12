import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import * as yup from 'yup';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

interface Segments {
    params: {
        id: string;
    }
}

const getTodo = async( id: string ):Promise<Todo | null> => {

    const user = await getUserSessionServer();

    if( !user ) return null;

    const todo = await prisma.todo.findFirst({ where: { id }});

    if( todo?.userId !== user.id ){
        return null;
    }
    
    return todo;
}

export async function GET(request: Request, { params }:Segments  ) { 

    const todo = await getTodo( params.id );
    if( !todo ) return NextResponse.json({ message: `Todo with id ${ params.id } not found` }, { status: 404 });

    return NextResponse.json( 
        todo
    )
}
const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
})

export async function PUT(request: Request, { params }:Segments ) { 
    const todo = await getTodo( params.id );

    if( !todo ) return NextResponse.json({ message: `Todo with id ${ params.id } not found` }, { status: 404 });

    try {
        const { complete, description } = await putSchema.validate( await request.json() );
    
        const updatedTodo = await prisma.todo.update({
            where : { id: params.id },
            data: { complete, description } 
        });
    
        return NextResponse.json( 
            updatedTodo
        )
        
    } catch (error) {
        return NextResponse.json( error, {status: 400 } );
    }
}