'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function HomePage() {
  const isLoggedIn = useAuth();
  const router = useRouter();

  const handleSearchClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  };

  return (
    <div className="flex-center">
      <h1 className='text-2xl font-bold mb-5'>Welcome to the Cocktail Viewer</h1>
      <nav>
        <ul>
          <li className="btn-primary my-6">
            <Link href="/search" onClick={handleSearchClick}>Search Cocktails</Link>
          </li>
          {isLoggedIn && (
            <li className="btn-secondary">
              <Link href="/saved">Saved Cocktails</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
