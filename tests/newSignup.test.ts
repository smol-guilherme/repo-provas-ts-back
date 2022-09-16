import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/databases/database";
import {
  completeUserForSignup,
  incompleteUserForSignup,
} from "./factories/usersFactory";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("POST /signup to register a new user", () => {
  it("inserting a new user with correct data so it succeeds", async () => {
    const body = completeUserForSignup();
    const { status } = await supertest(app).post("/signup").send(body);

    expect(status).toBe(201);
  });

  it("inserting a new user with missing data so it fails", async () => {
    const body = incompleteUserForSignup();
    const { status } = await supertest(app).post("/signup").send(body);

    expect(status).toBe(422);
  });

  it("inserting a new user with no data so it fails", async () => {
    const { status } = await supertest(app).post("/signup").send({});

    expect(status).toBe(400);
  });

  it("inserting a new user with duplicate data so it conflicts", async () => {
    const body = completeUserForSignup();
    const { status } = await supertest(app).post("/signup").send(body);

    expect(status).toBe(409);
  });
});

afterEach(async () => {
  await prisma.$disconnect();
});
