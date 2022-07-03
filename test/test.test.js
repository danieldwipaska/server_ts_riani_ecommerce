import request from "supertest";
import { app } from "../dist/app.js";

describe("GET /api/users", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).get("/api/users");
    expect(data.statusCode).toBe(200);
  });
});

describe("GET /api/users/:id", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).get("/api/users/2");
    expect(data.statusCode).toBe(200);
  });
  it("Should have status code 401", async () => {
    const data = await request(app).get("/api/users/3");
    expect(data.statusCode).toBe(401);
  });
});

describe("", () => {
  it("", async () => {});
});

describe("", () => {
  it("", async () => {});
});
