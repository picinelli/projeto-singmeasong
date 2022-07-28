import { prisma } from "../../src/database";
import createRecommendationData from "./recommendationsBodyFactory";

async function createRecommendation() {
  return await prisma.recommendation.create({
    data: await createRecommendationData(),
  });
}

async function createElevenRecommendations() {
  const recommendations = [];
  for (let i = 0; i <= 10; i++) {
    recommendations.push(
      await prisma.recommendation.create({
        data: await createRecommendationData(),
      })
    );
  }
  return { recommendations };
}

export { createRecommendation, createElevenRecommendations };
