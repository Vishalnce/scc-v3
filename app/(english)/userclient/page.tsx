"use client"

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function page() {

  const session = useSession();
  return (
    <div>
        <button 
        onClick={() => {
          signOut();
        }}
        >
            logout
        </button>
        
      <p>i am from cleint componetns</p>page
      {JSON.stringify(session)}
    </div>
  )
}
