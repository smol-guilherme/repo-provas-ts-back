import app from "../src/index";
import supertest from "supertest";
import { prisma } from "../src/databases/database";
import {
  completeUserForSignin,
  incompleteUserForSignin,
  nonExistentUserLogin,
} from "./factories/usersFactory";

describe("POST /signin to authenticate a new user", () => {
  it("sending a user with correct data so it succeeds, returning the session token", async () => {
    const body = completeUserForSignin(true);
    const response = await supertest(app).post("/signin").send(body);
    expect(response.status).toBe(200);
  });

  it("sending an empty request", async () => {
    const { status } = await supertest(app).post("/signin").send({});

    expect(status).toBe(400);
  });

  it("inserting a new user with missing data so it fails", async () => {
    const body = incompleteUserForSignin();
    const { status } = await supertest(app).post("/signin").send(body);
    expect(status).toBe(422);
  });

  it("sending a non existant user so it fails", async () => {
    const body = nonExistentUserLogin();
    const { status } = await supertest(app).post("/signin").send(body);

    expect(status).toBe(401);
  });

  it("sending an existing user with wrong password so it fails", async () => {
    const body = completeUserForSignin(false);
    const { status } = await supertest(app).post("/signin").send(body);

    expect(status).toBe(401);
  });
});

afterEach(async () => {
  await prisma.$disconnect();
});
