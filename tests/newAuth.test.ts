import app from "../src/index";
import supertest from "supertest";
import fs from "fs";
import { prisma } from "../src/databases/database";
import {
  completeUserForSignin,
  incompleteUserForSignin,
} from "./factories/usersFactory";

describe("POST /signin to register a new user", () => {
  it("inserting a new user with correct data so it succeeds", async () => {
    const body = completeUserForSignin();
    const response = await supertest(app).post("/signin").send(body);
    console.log(response);

    // fs.writeFileSync("token.txt", response.body.token);
    expect(response.status).toBe(200);
  });

  // it("inserting a new user with missing data so it fails", async () => {
  //   const body = incompleteUserForSignin();
  //   const { status } = await supertest(app).post("/signin").send(body);

  //   expect(status).toBe(422);
  // });

  // it("inserting a new user with duplicate data so it conflicts", async () => {
  //   const body = completeUserForSignin();
  //   const { status } = await supertest(app).post("/signin").send(body);

  //   expect(status).toBe(409);
  // });
});

afterEach(async () => {
  await prisma.$disconnect();
});
