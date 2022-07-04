import request from "supertest";
import { app } from "../dist/app.js";

//REGISTER
describe("POST /api/auth/register", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).post("/api/auth/register").send({
      username: "ekojulianto",
      password: "ouragaming",
      isAdmin: false,
    });
    expect(data.statusCode).toBe(200);
  });
  it("Should have status code 401 (missing form)", async () => {
    const data = await request(app).post("/api/auth/register").send({
      username: "ihsanbesari",
      password: "luminaire",
    });
    expect(data.statusCode).toBe(401);
  });
  it("Should have status code 403 (user already exists)", async () => {
    const data = await request(app).post("/api/auth/register").send({
      username: "danieldwipaska",
      password: "mikel666",
      isAdmin: false,
    });
    expect(data.statusCode).toBe(403);
  });
});

//LOGIN
describe("POST /api/auth/login", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).post("/api/auth/login").send({
      username: "ekojulianto",
      password: "ouragaming",
    });
    expect(data.statusCode).toBe(200);
  });
  it("Should have status code 401 (missing form)", async () => {
    const data = await request(app).post("/api/auth/login").send({
      username: "ihsanbesari",
    });
    expect(data.statusCode).toBe(401);
  });
  it("Should have status code 402 (wrong username)", async () => {
    const data = await request(app).post("/api/auth/login").send({
      username: "ihsanbes",
      password: "luminaire",
    });
    expect(data.statusCode).toBe(402);
  });
  it("Should have status code 402 (wrong password)", async () => {
    const data = await request(app).post("/api/auth/login").send({
      username: "ekojulianto",
      password: "luminarik",
    });
    expect(data.statusCode).toBe(402);
  });
});
