import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma';
import * as yup from 'yup';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

export async function GET(request: Request) { 
    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');

    if( isNaN(take) ) return NextResponse.json({ message: 'Take has to be a number' }, { status: 400 });
    if( isNaN(skip) ) return NextResponse.json({ message: 'Skip has to be a number' }, { status: 400 });

    const todos = await prisma.todo.findMany({ 
        take, 
        skip, 
    });
    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 

    const user = await getUserSessionServer();

    if( !user ) return NextResponse.json('Unauthorized', { status: 401 });

    try {
        const { complete, description } = await postSchema.validate( await request.json() );
    
        const todo = await prisma.todo.create({ data: { complete, description, userId: user.id } });
    
        return NextResponse.json(todo); 
    } catch (error) {
        NextResponse.json( error ,{ status: 400 });
    }
}

export async function DELETE(request: Request) { 
    const user = await getUserSessionServer();

    if( !user ) return NextResponse.json('Unauthorized', { status: 401 });

    try {
        await prisma.todo.deleteMany({ where: { complete: true, userId: user.id }});
        return NextResponse.json(JSON.stringify({
            message: `Todos completed deleted`
        }), { status: 200 } );
    } catch (error) {
        NextResponse.json( error ,{ status: 400 });
    }
}