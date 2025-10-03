import { NEXT_AUTH } from '@/lib/auth';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {

  const session = await getServerSession(NEXT_AUTH);

  return (
    <div>

      <p>I am from server components </p>

      {JSON.stringify(session)}
    </div>
  )
}
