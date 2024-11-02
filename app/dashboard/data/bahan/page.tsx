import { Suspense } from 'react';
import { BahanListing } from '@/sections/bahan/view/bahan-listing';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BahanPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Bahan" description="Manage your bahan inventory" />
          <Link href="/dashboard/data/bahan/create">
            <Button>Add New</Button>
          </Link>
        </div>
        <Separator />
        <Suspense fallback={<div>Loading...</div>}>
          <BahanListing />
        </Suspense>
      </div>
    </div>
  );
}
