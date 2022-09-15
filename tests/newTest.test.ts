import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/databases/database";
import { completeTest, incompleteTest } from "./factories/testsFactory";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzMjUwOTYyLCJleHAiOjE2NjMyNzk3NjJ9.-7IUwN_4Rzyl0-q3n6JzBvOfDvwu-QS4GxtCofhjVRM";

describe("POST /tests to insert a new test to the Database", () => {
  it("inserting an object with the correct structure and data, but no login", async () => {
    const body = completeTest();
    const { status } = await supertest(app).post("/tests").send(body);
    expect(status).toBe(401);
  });

  it("inserting an object with the correct structure and data", async () => {
    const body = completeTest();
    const { status } = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(status).toBe(201);
  });

  it("inserting an object with the correct structure but missing arguments/fields", async () => {
    const body = incompleteTest();
    const { status } = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    expect(status).toBe(422);
  });

  it("inserting an object with an expired token so it forbids", async () => {
    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzMjUwMDU3LCJleHAiOjE2NjMyNTAwNTd9.O596zfG2WrYxZALCtX9dhTKxsEfbD8_II_c3sdUamYQ";
    const body = completeTest();
    const { status } = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${expiredToken}`)
      .send(body);
    expect(status).toBe(403);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
