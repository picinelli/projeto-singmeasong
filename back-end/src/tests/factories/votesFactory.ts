import { prisma } from "../../database";

export default async function insertFiveDownvotes(id: number) {
  return await prisma.recommendation.update({
    data: {
      score: -5,
    },
    where: {
      id,
    },
  });
}
