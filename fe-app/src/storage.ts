import { Kecamatan } from "./types";

export const putDistrict = (district: Kecamatan) => {
  // Save a district to list of district in local storage
  const districts: Kecamatan[] = JSON.parse(
    localStorage.getItem("districts") ?? "[]"
  );
  const isDistrictExist = districts.find((item: Kecamatan) => item.id === district.id);

  if (!isDistrictExist) {
    districts.push(district);
  }
  localStorage.setItem("districts", JSON.stringify(districts));
}
