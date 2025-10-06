import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  const admins = [
    { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
  
  ];

  for (const admin of admins) {
    if (!admin.email || !admin.password) continue;

    await prisma.user.upsert({
      where: { email: admin.email },
      update: { role: "ADMIN" },
      create: {
        email: admin.email,
        password: admin.password, // plain text
        first: "Admin",
        last: "User",
        role: "ADMIN",
      },
    });

    console.log("✅ Admin ensured:", admin.email);
  }
}



main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
