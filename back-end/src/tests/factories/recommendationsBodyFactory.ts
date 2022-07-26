import { faker } from "@faker-js/faker";

export default async function createRecommendationData() {
  return {
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };
}
