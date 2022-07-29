import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import createRecommendationData from "../factories/recommendationsBodyFactory.js";
import * as errorUtils from "../../src/utils/errorUtils.js"

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UNIT test - insert", () => {
  it("Should create recommendation sucessfully", async () => {
    const data = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);
    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce();

    await recommendationService.insert(data)

    expect(recommendationRepository.create).toBeCalledTimes(1);
  });

  it("Should receive conflict Error", async () => {
    const data = await createRecommendationData()
    jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(():any => data)

    const promise = recommendationService.insert(data)

    expect(promise).rejects.toEqual({type: "conflict", message: "Recommendations names must be unique"})
  });
});

describe("UNIT test - upvote", () => {
  it("should upvote successfully", async () => {
    const data = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce({ ...data, id: 1, score: 1 });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(null);

    await recommendationService.upvote(1);

    expect(recommendationRepository.updateScore).toBeCalledTimes(1);
  });

  it("should not upvote successfully and return 404", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const promise = recommendationService.upvote(1);

    await expect(promise).rejects.toEqual({ type: "not_found", message: "" });
  });
});

describe("UNIT test - downvote", () => {
  it("should downvote successfully", async () => {
    const data = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce({ ...data, id: 1, score: 1 });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...data, id: 1, score: 1 });
    jest.spyOn(recommendationRepository, "remove").mockResolvedValueOnce(null);

    await recommendationService.downvote(1);

    expect(recommendationRepository.updateScore).toBeCalledTimes(1);
    expect(recommendationRepository.remove).toBeCalledTimes(0);
  });

  it("should downvote successfully AND remove recommendation with < 5 score", async () => {
    const data = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce({ ...data, id: 1, score: -5 });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...data, id: 1, score: -6 });
    jest.spyOn(recommendationRepository, "remove").mockResolvedValueOnce(null);

    await recommendationService.downvote(1);

    expect(recommendationRepository.updateScore).toBeCalledTimes(1);
    expect(recommendationRepository.remove).toBeCalledTimes(1);
  });

  it("should not downvote successfully and return 404", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

    const promise = recommendationService.downvote(1);

    await expect(promise).rejects.toEqual({ type: "not_found", message: "" });
  });
});

describe("UNIT test - get", () => {
  it("should call findAll 1 time", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue(null);

    await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalledTimes(1);
  });
});

describe("UNIT test - getTop", () => {
  it("should call findAll 1 time", async () => {
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValue(null);

    await recommendationService.getTop(1);

    expect(recommendationRepository.getAmountByScore).toBeCalledTimes(1);
  });
});

describe("UNIT test - getRandom", () => {
  it("given math Random < 0.7, should return gt on filter", async () => {
    const data = await createRecommendationData();
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    jest.spyOn(global.Math, "floor").mockReturnValue(0);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue([{ ...data, id: 1, score: 5 }]);

    const randomRecommendation = await recommendationService.getRandom();

    expect(randomRecommendation).toMatchObject({ ...data, id: 1, score: 5 });
  });

  it("given math Random > 0.7, should return lte on filter", async () => {
    const data = await createRecommendationData();
    jest.spyOn(global.Math, "random").mockReturnValue(0.8);
    jest.spyOn(global.Math, "floor").mockReturnValue(0);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue([{ ...data, id: 1, score: 5 }]);

    const randomRecommendation = await recommendationService.getRandom();

    expect(randomRecommendation).toMatchObject({ ...data, id: 1, score: 5 });
  });

  it("given empty array, should return not found error", () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

    const promise = recommendationService.getRandom();

    expect(promise).rejects.toEqual({ type: "not_found", message: "" });
  });
});
