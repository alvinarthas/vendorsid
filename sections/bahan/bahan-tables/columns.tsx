'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Bahan } from '@prisma/client';
import { CellAction } from './cell-action';
import Image from 'next/image';

export const columns: ColumnDef<Bahan>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl: string = row.getValue('imageUrl') || '/placeholder.png';
      return (
        <div className="flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={`Image of ${row.getValue('name')}`}
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'code',
    header: 'Code'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
