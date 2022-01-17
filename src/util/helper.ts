import https from "https";

interface ResponseData {
  statusCode: number;
  data: string;
}

export const httpRequest = (options: string | https.RequestOptions | URL): Promise<ResponseData> => {
  if (!options)
    return new Promise<ResponseData>((_, reject) => {
      reject({ statusCode: 0, err: "Missing 'options' arg." });
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
