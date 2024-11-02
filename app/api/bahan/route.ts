import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const bahans = await prisma.bahan.findMany({
      where: {
        deletedAt: null
      },
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json({ bahans });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bahans' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, name, description, imageUrl } = body;

    const bahan = await prisma.bahan.create({
      data: {
        code,
        name,
        description,
        imageUrl
      }
    });

    return NextResponse.json(bahan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create bahan' },
      { status: 500 }
    );
  }
}
