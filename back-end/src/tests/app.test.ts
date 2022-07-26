import supertest from "supertest";
import app from "../app.js";
import { prisma } from "../database.js";
import createRecommendationData from "./factories/recommendationsBodyFactory.js";
import { createScenarioOneRecommendation, deleteAllData } from "./factories/scenarioFactory.js";

beforeEach(async () => {
  await deleteAllData();
});

describe("POST /recommendations tests", () => {
  it("given valid body information, should return 201", async () => {
    const body = await createRecommendationData();
    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.statusCode).toBe(201);
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
    const {id} = await createScenarioOneRecommendation()
    const response = await supertest(app).post(`/recommendations/${id}/upvote`)

    expect(response.statusCode).toBe(200)
  })

  it("given invalid id, should return 404", async () => {
    const response = await supertest(app).post("/recommendations/-1/upvote")

    expect(response.statusCode).toBe(404)
  })
})

afterAll(async () => {
  await prisma.$disconnect();
});
