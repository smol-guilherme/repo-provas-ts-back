import app from "../src/index";
import supertest from "supertest";

describe("POST /tests to insert a new test to the Database", async () => {
  it("inserting an object with the correct structure and data", async () => {
    //async?
    const body = {
      name: "Projeto Globo",
      pdfUrl: "https://www.google.com/pdf",
      category: "Projeto",
      discipline: "HTML e CSS",
      teacherName: "Diego Pinho",
    };
    const { status } = await supertest(app).post("/tests").send(body);
    expect(status).toBe(401);
  });
});
