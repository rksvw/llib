import request from "supertest";
import app from "./server";

describe("GraphQL API", () => {
  it("should return a valid response for a simpole query", async () => {
    const query = `query {hello}`;
    const res = await request(app).post("/graphql").send({ query });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.hello).toBe("Hello, World!");
  });
});