import { prisma } from "../database.js";

async function deleteAllData() {
  return await prisma.recommendation.deleteMany();
}

export default {
  deleteAllData,
};
