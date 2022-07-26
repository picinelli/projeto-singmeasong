import { prisma } from "../../database.js";
import createRecommendation from "./recommendationFactory.js";

async function createScenarioOneRecommendation() {
  return await createRecommendation()
}

async function deleteAllData() {
  await prisma.$executeRaw`DELETE FROM recommendations`;
}

export { 
  deleteAllData, 
  createScenarioOneRecommendation 
};
