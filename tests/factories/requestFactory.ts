import { faker } from "@faker-js/faker";

export function randomFilterWord() {
  return faker.word.noun(1);
}

export function randomValidFilter() {
  const filters = ["teacher", "discipline"];
  return filters[Math.floor(Math.random())];
}
