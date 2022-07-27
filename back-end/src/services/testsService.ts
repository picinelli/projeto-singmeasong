import testsRepository from "../repositories/testsRepository.js";

async function deleteAllData() {
  return await testsRepository.deleteAllData();
}

export default {
  deleteAllData,
}
