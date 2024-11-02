import { Bahan } from '@prisma/client';

export async function getBahans() {
  try {
    const response = await fetch('/api/bahan');
    if (!response.ok) {
      throw new Error('Failed to fetch bahans');
    }
    const data = await response.json();
    return { bahans: data.bahans };
  } catch (error) {
    return { error: 'Failed to fetch bahans' };
  }
}

export async function getBahanById(id: string) {
  try {
    const response = await fetch(`/api/bahan/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bahan');
    }
    const data = await response.json();
    return { bahan: data };
  } catch (error) {
    return { error: 'Failed to fetch bahan' };
  }
}

export async function createBahan(
  bahanData: Omit<Bahan, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) {
  try {
    const response = await fetch('/api/bahan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bahanData)
    });
    if (!response.ok) {
      throw new Error('Failed to create bahan');
    }
    const data = await response.json();
    return { bahan: data };
  } catch (error) {
    return { error: 'Failed to create bahan' };
  }
}

export async function updateBahan(id: string, bahanData: Partial<Bahan>) {
  try {
    const response = await fetch(`/api/bahan/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bahanData)
    });
    if (!response.ok) {
      throw new Error('Failed to update bahan');
    }
    const data = await response.json();
    return { bahan: data };
  } catch (error) {
    return { error: 'Failed to update bahan' };
  }
}

export async function deleteBahan(id: string) {
  try {
    const response = await fetch(`/api/bahan/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete bahan');
    }
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete bahan' };
  }
}
