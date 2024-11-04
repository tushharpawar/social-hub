'use client'

import { useParams } from 'next/navigation';


export default function UserProfilePage() {
  const params = useParams<{ username: string }>();
  const {username} = params

  return (
    <div>
      <h1>Welcome, {username}!</h1>
    </div>
  );
}