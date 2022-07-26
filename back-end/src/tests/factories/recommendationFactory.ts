import { prisma } from "../../database";
import createRecommendationData from "./recommendationsBodyFactory";

async function createRecommendation() {
  return await prisma.recommendation.create({
    data: await createRecommendationData(),
  });
}

//TODO: Tem alguem usando isso?
async function createElevenRecommendations() {
  const recommendations = [];
  for (let i = 0; i <= 11; i++) {
    recommendations.push(
      await prisma.recommendation.create({
        data: await createRecommendationData(),
      })
    );
  }
  return recommendations;
}

export { createRecommendation, createElevenRecommendations };
