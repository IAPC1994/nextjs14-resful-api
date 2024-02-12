import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            name: 'test1',
            password: bcrypt.hashSync('123456'),
            roles: ['admin'],
            todos: {
                create: [
                    { description: 'Learn NextJS 14', complete: true },
                    { description: 'Learn Angular' },
                    { description: 'Learn Tailwind CSS' },
                    { description: 'Learn Prisma' },
                    { description: 'Learn Postgres' },
                ]
            }
        }
    });

    // await prisma.todo.createMany({
    //     data: [
    //         { description: 'Learn NextJS 14', complete: true, userId: '' },
    //         { description: 'Learn Angular', userId: '' },
    //         { description: 'Learn Tailwind CSS', userId: '' },
    //         { description: 'Learn Prisma', userId: '' },
    //         { description: 'Learn Postgres', userId: '' },
    //     ]
    // })
    return NextResponse.json({ message: 'Seed executed'});
}