import { PrismaClient } from "@prisma/client";

const connection = new PrismaClient();

const disconnect = async () => {
  await connection.$disconnect();
};

export default connection;
export { disconnect };
