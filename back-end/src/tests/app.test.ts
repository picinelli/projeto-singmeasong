import supertest from "supertest";
import app from "../app.js";
import { prisma } from "../database.js";
import createRecommendationData from "./factories/recommendationsBodyFactory.js";
import {
  createScenarioElevenRecommendations,
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

    const recommendationOnDB = prisma.recommendation.findUnique({
      where: { id: response.body.id },
    });
    expect(recommendationOnDB).toMatchObject(response.body);
  });

  it("given already used name, should return 409", async () => {
    const body = await createRecommendationData();
    const originalUser = await supertest(app)
      .post("/recommendations")
      .send(body);
    expect(originalUser.statusCode).toBe(201);

    const newUser = await supertest(app).post("/recommendations").send(body);
    expect(newUser.statusCode).toBe(409);
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

    const recommendationOnDB = prisma.recommendation.findUnique({
      where: { id: response.body.id },
    });
    expect(recommendationOnDB).toMatchObject(response.body);
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

    const recommendationOnDB = prisma.recommendation.findUnique({
      where: { id: response.body.id },
    });
    expect(recommendationOnDB).toMatchObject(response.body);
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

    const recommendationOnDB = prisma.recommendation.findUnique({
      where: { id },
    });
    expect(recommendationOnDB[0]).toBeUndefined();
  });
});

describe("GET /recommendations", () => {
  it("given 11 recommendations on DB, should return last 10 and status code 200", async () => {
    const { recommendations } = await createScenarioElevenRecommendations();
    const response = await supertest(app).get("/recommendations");
    expect(response.body.length).toBe(10);
    expect(response.statusCode).toBe(200);

    recommendations.reverse().splice(recommendations.length - 1, 1);
    expect(response.body).toMatchObject(recommendations);
  });
});

describe("GET /recommendations/:id", () => {
  it("given valid recommendation ID, should return 200", async () => {
    const recommendation = await createScenarioOneRecommendation();
    const response = await supertest(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(recommendation);
  });

  it("given invalid recommendation ID, should return 404", async () => {
    await createScenarioOneRecommendation();
    const response = await supertest(app).get("/recommendations/-1");

    expect(response.statusCode).toBe(404);
    expect(response.body.id).toBeUndefined();
  });
});

//TODO: Fazer os testes da rota random
// describe("GET /recommendations/random", () => {
// });

//TODO: Fazer os testes da rota top
// describe("GET /recommendations/top/:amount", () => {
// });

afterAll(async () => {
  await deleteAllData();
  await prisma.$disconnect();
});
