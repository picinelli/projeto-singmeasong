import { prisma } from "../../database";
import createRecommendationData from "./recommendationsBodyFactory";

export default async function createRecommendation() {
  return await prisma.recommendation.create({
    data: await createRecommendationData()
  })
}
