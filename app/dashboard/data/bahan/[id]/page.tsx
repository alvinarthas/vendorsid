import { BahanForm } from '@/sections/bahan/bahan-form';

export default function EditBahanPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BahanForm id={params.id} />
      </div>
    </div>
  );
}
