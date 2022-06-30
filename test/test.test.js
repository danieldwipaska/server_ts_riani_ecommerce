import supertest from "supertest";
import { app } from "../dist/app.js";
const request = supertest(app);

describe("POST users", () => {
  it("Should have status 200", async () => {
    const response = await request.get("/api/users");
    expect(response.status).toBe(200);
  });
});
