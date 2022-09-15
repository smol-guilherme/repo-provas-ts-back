import app from "../src/index";
import supertest from "supertest";
import { completeTest } from "./factories/testsFactory";
import { prisma } from "../src/databases/database";

beforeEach(() => {
  prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe("POST /tests to insert a new test to the Database", () => {
  it("inserting an object with the correct structure and data, but no login", async () => {
    const body = completeTest();
    const { status } = await supertest(app).post("/tests").send(body);
    expect(status).toBe(401);
  });

  it("inserting an object with the correct structure and data", async () => {
    const body = completeTest();
    const { status } = await supertest(app).post("/tests").send(body);
    expect(status).toBe(201);
  });

  it("inserting an object with the correct structure and data again so it conflicts", async () => {
    const body = completeTest();
    const { status } = await supertest(app).post("/tests").send(body);
    expect(status).toBe(409);
  });

  it("inserting an object with an expired token so it forbids", async () => {
    const body = completeTest();
    const { status } = await supertest(app).post("/tests").send(body);
    expect(status).toBe(403);
  });
});

afterEach(async () => {
  await prisma.$disconnect();
});
