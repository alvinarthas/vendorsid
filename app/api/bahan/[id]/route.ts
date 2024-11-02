import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bahan = await prisma.bahan.findUnique({
      where: {
        id: params.id
      }
    });

    if (!bahan) {
      return NextResponse.json({ error: 'Bahan not found' }, { status: 404 });
    }

    return NextResponse.json(bahan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bahan' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { code, name, description, imageUrl } = body;

    const updatedBahan = await prisma.bahan.update({
      where: {
        id: params.id
      },
      data: {
        code,
        name,
        description,
        imageUrl
      }
    });

    return NextResponse.json(updatedBahan);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update bahan' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.bahan.update({
      where: {
        id: params.id
      },
      data: {
        deletedAt: new Date()
      }
    });

    return NextResponse.json({ message: 'Bahan deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete bahan' },
      { status: 500 }
    );
  }
}
