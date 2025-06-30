
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function SignInButton() {
  const {data: session} = useSession()
  if( session && session.user) {
    return (
      <div className="p-2" onClick={()=> {signOut()}}> Sign-out</div>
    )
  }
  return (
    <Link href="/sign-in">Sign In </Link>
  )
}

export default SignInButton