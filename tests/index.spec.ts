import nock from "nock";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { calculateScore } from "../src";

describe("index", () => {
  it("calculateScore", async () => {
    nock("https://registry.npmjs.org")
      .get("/@faker-js/faker")
      .reply(
        200,
        readFileSync(
          "./tests/fixtures/npmjs-registry/get_@faker-js__faker.json",
          "utf8"
        )
      );

    nock("https://github.com")
      .get("/faker-js/faker/tree/7c7f78daa0fef802af916c2f192cc36bee6c88d2")
      .reply(
        200,
        readFileSync(
          "./tests/fixtures/github/get_@faker-js__faker__7c7f78daa0fef802af916c2f192cc36bee6c88d2.json",
          "utf8"
        )
      );

    const actual = await calculateScore("@faker-js/faker");
    expect(actual).toBe(1);
  });
});
