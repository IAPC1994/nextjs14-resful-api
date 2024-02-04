import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            { description: 'Learn NextJS 14', complete: true },
            { description: 'Learn Angular' },
            { description: 'Learn Tailwind CSS' },
            { description: 'Learn Prisma' },
            { description: 'Learn Postgres' },
        ]
    })
    return NextResponse.json({ message: 'Seed executed'});
}