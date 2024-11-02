import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Ukuran } from '@/constants/data';
import { fakeUkuran } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import UkuranTable from '../tables';

type UkuranListingPage = {};

export default async function ListingPage({}: UkuranListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search })
  };

  const data = await fakeUkuran.getData(filters);
  const totalData = data.total_data;
  const Ukurans: Ukuran[] = data.data;

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Ukuran`}
            description="Atur Ukuran-Ukuran yang akan digunakan"
          />
          <Link
            href={'/dashboard/data/ukuran/create'}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Baru
          </Link>
        </div>
        <Separator />
        <UkuranTable data={Ukurans} totalData={totalData} />
      </div>
    </PageContainer>
  );
}