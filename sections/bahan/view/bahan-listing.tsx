'use client';

import { useEffect, useState } from 'react';
import { getBahans } from '@/lib/api/bahan';
import { BahanTable } from '../bahan-tables';
import { Bahan } from '@prisma/client';

export function BahanListing() {
  const [bahans, setBahans] = useState<Bahan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBahans() {
      setIsLoading(true);
      const { bahans, error } = await getBahans();
      if (error) {
        setError(error);
      } else {
        setBahans(bahans);
      }
      setIsLoading(false);
    }

    fetchBahans();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <BahanTable data={bahans} />;
}
