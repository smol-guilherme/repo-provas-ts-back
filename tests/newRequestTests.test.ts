import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/databases/database";
import {
  randomFilterWord,
  randomValidFilter,
} from "./factories/requestFactory";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ybbR8CBWWQSJ9SkJRLXLDi7rIqjbBwGi8K4iSOm5w6U`;

describe("GET /tests to retrieve data from the database", () => {
  it("request a valid set of data at random (teacher/discipline), but no login", async () => {
    const { status } = await supertest(app).get(
      `/tests/${randomValidFilter()}`
    );
    expect(status).toBe(401);
  });

  it("request a valid set of data at random with an expired token so it forbids", async () => {
    const expiredToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzMjUwMDU3LCJleHAiOjE2NjMyNTAwNTd9.O596zfG2WrYxZALCtX9dhTKxsEfbD8_II_c3sdUamYQ`;
    const { status } = await supertest(app)
      .get(`/tests/${randomValidFilter()}`)
      .set("Authorization", `Bearer ${expiredToken}`);
    expect(status).toBe(403);
  });

  it("request a valid set of data at random (teacher/discipline) ", async () => {
    const path = randomValidFilter();
    console.log(path);

    const { status } = await supertest(app)
      .get(`/tests/${randomValidFilter()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(status).toBe(200);
  });

  it("request data filtered by the list of teachers", async () => {
    const response = await supertest(app)
      .get(`/tests/teacher`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("request data filtered by the list of disciplines", async () => {
    const response = await supertest(app)
      .get(`/tests/discipline`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("request an invalid set of data at random", async () => {
    const filter = randomFilterWord();

    const { status } = await supertest(app)
      .get(`/tests`)
      .set("Authorization", `Bearer ${token}`)
      .send(filter);
    expect(status).toBe(422);
  });
});

afterAll(async () => {
  // await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY;`;
  await prisma.$disconnect();
});
