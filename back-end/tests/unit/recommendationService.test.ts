import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import createRecommendationData from "../factories/recommendationsBodyFactory.js";

const erro = jest.fn()

jest.mock("../../src/utils/errorUtils.js", () => {
  return {
    conflictError: erro,
  }
});

describe("UNIT test - insert", () => {
  it("Should create recommendation sucessfully", async () => {
    const data = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);

    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce();

    const recommendationExist = await recommendationRepository.findByName(
      data.name
    );

    await recommendationRepository.create(data);

    expect(recommendationExist).toBe(null);
    expect(recommendationRepository.create).toBeCalledTimes(1);
  });

  it("Should receive conflict Error", async () => {
    const data = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce({ ...data, id: 1, score: 1 });

    const recommendationExist = await recommendationRepository.findByName(
      data.name
    );

    await recommendationService.insert(data)

    expect(recommendationExist).toBeTruthy();
    expect(erro).toBeCalledTimes(1);
  });
});
