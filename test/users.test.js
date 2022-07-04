import request from "supertest";
import { app } from "../dist/app.js";

//GET ALL USERS
describe("GET /api/users", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).get("/api/users");
    expect(data.statusCode).toBe(200);
  });
});

//GET A USER
describe("GET /api/users/:id", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).get("/api/users/2");
    expect(data.statusCode).toBe(200);
  });
  it("Should have status code 401 (id not found)", async () => {
    const data = await request(app).get("/api/users/3");
    expect(data.statusCode).toBe(401);
  });
  it("Should have status code 500 (id not valid)", async () => {
    const data = await request(app).get("/api/users/a");
    expect(data.statusCode).toBe(500);
  });
});

//UPDATE A USER
describe("PUT /api/users/:id/update", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).put("/api/users/6/update").send({
      username: "miketyler",
      password: "mikel",
    });
    expect(data.statusCode).toBe(200);
  });
  it("Should have status code 401 (missing form)", async () => {
    const data = await request(app).put("/api/users/6/update").send({
      username: "miketyler",
    });
    expect(data.statusCode).toBe(401);
  });
  it("Should have status code 402 (id not found)", async () => {
    const data = await request(app).put("/api/users/114/update").send({
      username: "miketyler",
      password: "mikel",
    });
    expect(data.statusCode).toBe(402);
  });
  it("Should have status code 500 (id not valid)", async () => {
    const data = await request(app).put("/api/users/a/update").send({
      username: "miketyler",
      password: "mikel",
    });
    expect(data.statusCode).toBe(500);
  });
});

//DELETE A USER
describe("DELETE api/users/:id/delete", () => {
  it("Should have status code 200", async () => {
    const data = await request(app).delete("/api/users/5/delete");
    expect(data.statusCode).toBe(200);
  });
  it("Should have status code 402 (id not found)", async () => {
    const data = await request(app).delete("/api/users/125/delete");
    expect(data.statusCode).toBe(402);
  });
  it("Should have status code 500 (id not valid)", async () => {
    const data = await request(app).delete("/api/users/a/delete");
    expect(data.statusCode).toBe(500);
  });
});
