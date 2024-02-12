'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {

    const { data: session } = useSession();

    useEffect(() => {
      console.log('Client Side');
    }, [])
    
    return (
        <div>
            <h1>Profile Page</h1>
            <hr />

            <div className="flex flex-col">
                <span>{ session?.user?.name  ?? 'No data'}</span>
                <span>{ session?.user?.email ?? 'No data'}</span>
                <span>{ session?.user?.image ?? 'No data'}</span>
                <span>{ session?.user?.id ?? 'No data'}</span>
                <span>{ session?.user?.roles?.join(', ') ?? 'No data'}</span>
            </div>
        </div>
    );
}