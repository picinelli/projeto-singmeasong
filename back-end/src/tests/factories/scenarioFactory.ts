import { prisma } from "../../database.js";
import {createRecommendation} from "./recommendationFactory.js";
import insertFiveDownvotes from "./votesFactory.js";

async function createScenarioOneRecommendation() {
  return await createRecommendation();
}

async function createScenarioOneRecommendationWithFiveDownvotes() {
  const { id } = await createRecommendation();
  await insertFiveDownvotes(id);

  return { id };
}

async function deleteAllData() {
  await prisma.$executeRaw`DELETE FROM recommendations`;
}

export {
  deleteAllData,
  createScenarioOneRecommendation,
  createScenarioOneRecommendationWithFiveDownvotes,
};
