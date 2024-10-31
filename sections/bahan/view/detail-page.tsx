'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Info, X } from 'lucide-react';

// This would typically come from an API or database
const bahanData: Bahan = {
  id: 1,
  photo_url: '/placeholder.svg?height=150&width=150',
  name: 'Cotton',
  description:
    'A soft, breathable fabric made from natural fibers. Ideal for everyday wear and comfortable in various climates. Cotton is known for its versatility and is widely used in the textile industry for producing a range of garments from t-shirts to denim jeans.'
};

export type Bahan = {
  id: number;
  photo_url: string;
  name: string;
  description: string;
};

export default function BahanDetailPage() {
  const params = useParams();
  const [isImageOpen, setIsImageOpen] = useState(false);

  // In a real app, you'd fetch the bahan data based on the ID
  // const { id } = params
  // const bahan = await getBahan(id)
  const bahan = bahanData;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="flex items-start justify-center p-4 sm:w-1/5">
            <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="h-auto p-0">
                  <Image
                    src={bahan.photo_url}
                    alt={bahan.name}
                    width={150}
                    height={150}
                    className="h-auto w-full max-w-[150px] cursor-pointer rounded-md object-cover transition-transform hover:scale-105"
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-hidden p-0">
                <div className="relative h-full w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 z-10"
                    onClick={() => setIsImageOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Image
                    src={bahan.photo_url}
                    alt={bahan.name}
                    layout="responsive"
                    width={1920}
                    height={1080}
                    className="object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="p-6 sm:w-4/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold">
                    {bahan.name}
                  </CardTitle>
                  <CardDescription className="mt-2 text-lg">
                    Material ID: {bahan.id}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="px-3 py-1 text-lg">
                  Bahan
                </Badge>
              </div>
            </CardHeader>
            <Separator className="my-6" />
            <CardContent>
              <h3 className="mb-4 flex items-center text-xl font-semibold">
                <Info className="mr-2 h-5 w-5" /> Description
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {bahan.description}
              </p>
              <div className="mt-8 flex justify-end">
                <Button className="mr-4">Edit Material</Button>
                <Button variant="outline">Back to List</Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
