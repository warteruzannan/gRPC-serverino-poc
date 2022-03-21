const http = require("http");
const grpc = require("@grpc/grpc-js");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(
  path.resolve("severino.proto"),
  options
);

const ServerinoService =
  grpc.loadPackageDefinition(packageDefinition).ServerinoService;

const client = new ServerinoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const httpServer = http.createServer((req, res) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const dataToValidate = JSON.parse(data);
    client.ValidateUserData(dataToValidate, (error, validatedData) => {
      if (error) {
        res.statusCode = 400;
        res.write(error.message);
      } else {
        res.statusCode = 400;
        res.write(JSON.stringify(validatedData));
      }
      res.end();
    });
  });
});

httpServer.listen(4000, () =>
  console.log(`.:: Client Server Running at ${4000}::.`)
);
