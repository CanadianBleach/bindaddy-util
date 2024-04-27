'use client'

import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

const GoogleSignInButton = () => {
    const { session } = useSession();

    if (session && session.user) {
        return (
            <>

            </>
        )
    }
}

export default GoogleSignInButton;