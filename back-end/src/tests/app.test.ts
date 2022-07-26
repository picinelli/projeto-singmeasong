import supertest from "supertest";
import app from "../app.js";
import { prisma } from "../database.js";
import createRecommendationData from "./factories/recommendationsBodyFactory.js";
import {
  createScenarioOneRecommendation,
  createScenarioOneRecommendationWithFiveDownvotes,
  deleteAllData,
} from "./factories/scenarioFactory.js";

beforeEach(async () => {
  await deleteAllData();
});

describe("POST /recommendations tests", () => {
  it("given valid body information, should return 201", async () => {
    const body = await createRecommendationData();
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.statusCode).toBe(201);

    const recommendationOnDB = prisma.recommendation.findUnique({where: {id: response.body.id}})
    expect(recommendationOnDB).toMatchObject(response.body)
  });

  it("given invalid typeof name, should return 422", async () => {
    const body = await createRecommendationData();
    const response = await supertest(app)
      .post("/recommendations")
      .send({ ...body, name: -1 });

    expect(response.statusCode).toBe(422);
  });

  it("given invalid typeof youtubeLink, should return 422", async () => {
    const body = await createRecommendationData();
    const response = await supertest(app)
      .post("/recommendations")
      .send({ ...body, youtubeLink: -1 });

    expect(response.statusCode).toBe(422);
  });

  it("given invalid url domain, should return 422", async () => {
    const body = await createRecommendationData();
    const response = await supertest(app)
      .post("/recommendations")
      .send({ ...body, youtubeLink: "https://google.com" });

    expect(response.statusCode).toBe(422);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("given valid id and request URL, should return 200", async () => {
    const { id } = await createScenarioOneRecommendation();
    const response = await supertest(app).post(`/recommendations/${id}/upvote`);
    expect(response.statusCode).toBe(200);

    const recommendationOnDB = prisma.recommendation.findUnique({where: {id: response.body.id}})
    expect(recommendationOnDB).toMatchObject(response.body)
  });

  it("given invalid id, should return 404", async () => {
    const response = await supertest(app).post("/recommendations/-1/upvote");

    expect(response.statusCode).toBe(404);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("given valid id and request URL, should return 200", async () => {
    const { id } = await createScenarioOneRecommendation();
    const response = await supertest(app).post(
      `/recommendations/${id}/downvote`
    );
    expect(response.statusCode).toBe(200);

    const recommendationOnDB = prisma.recommendation.findUnique({where: {id: response.body.id}})
    expect(recommendationOnDB).toMatchObject(response.body)
  });

  it("given invalid id, should return 404", async () => {
    const response = await supertest(app).post("/recommendations/-1/downvote");

    expect(response.statusCode).toBe(404);
  });

  it("given 5 downvotes + 1, should delete recommendation and return 200", async () => {
    const { id } = await createScenarioOneRecommendationWithFiveDownvotes();
    const response = await supertest(app).post(
      `/recommendations/${id}/downvote`
    );

    expect(response.statusCode).toBe(200);

    const recommendationOnDB = prisma.recommendation.findUnique({ where: { id } });
    expect(recommendationOnDB[0]).toBeUndefined();
  });
});


afterAll(async () => {
  await prisma.$disconnect();
});
