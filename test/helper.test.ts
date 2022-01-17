import { assert } from "console";
import { generateRandomId, getRandomKeyword, httpRequest } from "../src/util/helper";

describe("Helper Functions", () => {
  it("Should generate random ID", async () => {
    assert(generateRandomId(11) !== generateRandomId(11));
  });
  it("Should successfully make a HTTP request", async () => {
    const { statusCode } = await httpRequest("https://google.com/");
    expect(statusCode === 200 || statusCode === 301).toBe(true);
  });
  it("Should randomly pick a keyword", async () => {
    expect(getRandomKeyword()).toBeDefined();
  });
});
