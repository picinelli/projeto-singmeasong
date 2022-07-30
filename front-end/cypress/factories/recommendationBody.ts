import { faker } from "@faker-js/faker";

function createRecommendationBody() {
  return {
    name: faker.lorem.lines(1),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };
}

export default {
  createRecommendationBody,
};
