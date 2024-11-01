'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AuthButton() {
  const session = useSession();

  if (session.status === 'loading') {
    return null; // or a loading spinner
  }

  if (session.status === 'authenticated') {
    return null; // or a user menu
  }

  return (
    <Link
      href="/signin"
      className="text-sm font-medium text-primary hover:underline"
    >
      Masuk sebagai reseller
    </Link>
  );
}
