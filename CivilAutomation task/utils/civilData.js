import { VALID_CIVIL_DATA ,API_URL} from "../config/testData.js";

export async function createUniqueCivilData() {
  let records = [];

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
