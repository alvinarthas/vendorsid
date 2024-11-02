'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createBahan, updateBahan, getBahanById } from '@/lib/api/bahan';
import { uploadFile } from '@/lib/supabase';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface BahanFormProps {
  id?: string;
}

export function BahanForm({ id }: BahanFormProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    imageUrl: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchBahan();
    }
  }, [id]);

  const fetchBahan = async () => {
    const { bahan, error } = await getBahanById(id!);
    if (bahan) {
      setFormData(bahan);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = formData.imageUrl;

    if (file) {
      const { data, error } = await uploadFile(file);
      if (error) {
        console.error('Error uploading file:', error);
        setLoading(false);
        return;
      }
      imageUrl = data.publicUrl;
    }

    const bahanData = { ...formData, imageUrl };

    try {
      if (id) {
        await updateBahan(id, bahanData);
      } else {
        await createBahan(bahanData);
      }
      router.push('/dashboard/data/bahan');
    } catch (error) {
      console.error('Error saving bahan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={id ? 'Edit Bahan' : 'Create Bahan'}
          description={
            id ? 'Edit an existing bahan' : 'Add a new bahan to your inventory'
          }
        />
      </div>
      <Separator />
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-3">
            <Label htmlFor="imageUrl">Image</Label>
            <Input
              id="imageUrl"
              type="file"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>
          <div className="col-span-3">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div className="col-span-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div className="col-span-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {id ? 'Save changes' : 'Create'}
        </Button>
      </form>
    </>
  );
}
