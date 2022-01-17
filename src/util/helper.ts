import https from "https";

interface ResponseData {
  statusCode: number;
  data: string;
  error?: string;
}

export const httpRequest = (options: string | https.RequestOptions | URL): Promise<ResponseData> => {
  if (!options)
    return new Promise<ResponseData>((_, reject) => {
      reject({ statusCode: 0, error: "Missing 'options' arg." });
    });

  return new Promise<ResponseData>((resolve, reject) => {
    let req = https.request(options, (res) => {
      let buffer = "";

      res.on("data", (data: string) => {
        buffer += data;
      });

      res.on("end", () => {
        resolve({ statusCode: res.statusCode, data: buffer });
      });

      req.on("error", (err: Error) => {
        reject({ statusCode: 0, error: err.toString() || "Unknown Error" });
      });

      req.on("timeout", (err: string) => {
        reject({ statusCode: 0, error: "Timeout exceeded." });
      });
    });

    req.end();
  });
};

export const generateRandomId = (length: number): string => {
  let result = [];
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
  return result.join("");
};

export const getRandomKeyword = (): string => {
  let list = ["halo", "mars", "satellite", "space", "stars", "milky", "milkyway", "moon", "earth"];
  return list[Math.floor(Math.random() * list.length)];
};
