import { VALID_CIVIL_DATA } from "../config/testData.js";

export async function createUniqueCivilData() {
  let records = [];

  try {
    const response = await fetch("http://localhost:3000/get/all");
    if (response.ok) {
      records = await response.json();
    }
  } catch (err) {
    records = [];
  }

  const ids = records
    .map((item) => Number(item?.ID))
    .filter((id) => Number.isFinite(id) && !isNaN(id));

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const newId = maxId + 1;

  return {
    ...VALID_CIVIL_DATA,
    civilId: String(newId),
  };
}
