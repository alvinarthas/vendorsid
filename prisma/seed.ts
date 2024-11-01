import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    'Superadmin',
    'Admin',
    'Reseller',
    'Design Setting (DS)',
    'Printing',
    'Pressing',
    'Jahit',
    'Finishing'
  ];

  for (const role of roles) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        name: `${role} User`,
        email: `${role.toLowerCase().replace(/\s+/g, '')}@example.com`,
        password: hashedPassword,
        role: role,
        phone: '1234567890',
        gender: Math.random() > 0.5 ? 'Male' : 'Female'
      }
    });
  }

  console.log('Dummy data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
