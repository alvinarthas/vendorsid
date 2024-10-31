import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema
const createBahanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  photo_url: z.string().url('Invalid photo URL')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body
    const validation = createBahanSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // Insert new bahan using Prisma
    const bahan = await prisma.bahan.create({
      data: {
        name: body.name,
        description: body.description,
        photo_url: body.photo_url
      }
    });

    return NextResponse.json(bahan, { status: 201 });
  } catch (error) {
    console.error('Error creating bahan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
