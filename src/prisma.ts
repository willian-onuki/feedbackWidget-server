import { PrismaClient } from "@prisma/client";

//logs any realized databease actions
export const prisma = new PrismaClient({
  log: ['query'],
})
