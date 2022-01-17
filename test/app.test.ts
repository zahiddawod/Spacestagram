import axios from "axios";

const PORT: number = parseInt(process.env.PORT || "8080");

let URL = `http://localhost:${PORT}`;

describe("GET /", () => {
  it("Home route should return 200 OK", async () => {
    const response = await axios.get(URL + "/");
    expect(response.status).toBe(200);
  });
  it("A random endpoint should return 200 OK", async () => {
    const response = await axios.get(URL + "/gewg23");
    expect(response.status).toBe(200);
  });
});
