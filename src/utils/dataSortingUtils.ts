import {
  Hashtable,
  TTestDisciplineArray,
  TTestInfoArray,
} from "../types/dataTypes.js";

export function sortTests(
  data: TTestInfoArray[][],
  customHash: Hashtable<number>
) {
  const newTests: TTestInfoArray[][] = [];
  let auxArr: TTestInfoArray[] = [];
  const newArr = data.flat(1);
  let i = 0;
  let hashFilter = Object.keys(customHash)[0];
  while (Object.keys(customHash).length !== 0) {
    if (i === newArr.length) {
      i = 0;
      delete customHash[hashFilter];
      hashFilter = Object.keys(customHash)[0];
      if (auxArr.length !== 0) newTests.push(auxArr);
      auxArr = [];
    }
    if (newArr[i].category === hashFilter) auxArr.push(newArr[i]);
    i++;
  }
  return newTests;
}

export function sortDTests(
  data: TTestDisciplineArray[][],
  customHash: Hashtable<number>
) {
  const newTests: TTestDisciplineArray[][] = [];
  let auxArr: TTestDisciplineArray[] = [];
  const newArr = data.flat(1);
  let safety = 0;
  let i = 0;
  let hashFilter = Object.keys(customHash)[0];
  while (Object.keys(customHash).length !== 0) {
    if (safety > 500) throw {};
    if (i === newArr.length) {
      i = 0;
      delete customHash[hashFilter];
      hashFilter = Object.keys(customHash)[0];
      if (auxArr.length !== 0) newTests.push(auxArr);
      auxArr = [];
    }
    if (newArr[i]?.category === hashFilter) auxArr.push(newArr[i]);
    i++;
    safety++;
  }
  return newTests;
}
