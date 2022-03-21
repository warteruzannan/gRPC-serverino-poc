const grpcLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const path = require("path");

const THRESHOLD = 0.5;
const LoadDefinitions = grpcLoader.load(path.resolve("severino.proto"));

function ValidateUserData({ request: userData }, callback) {
  const validations = [];
  console.log(`novo dado para validar`, userData);
  Object.keys(userData).forEach((fieldName) => {
    const ratio = Math.random();
    const valid = ratio > THRESHOLD ? true : false;
    validations.push({
      ratio,
      valid,
      fieldName,
    });
  });
  return callback(null, { validations });
}

LoadDefinitions.then((Definitions) => {
  const server = new grpc.Server();
  server.addService(Definitions.ServerinoService, { ValidateUserData });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      server.start();
      console.log(`.:: Port server at ${port} ::.`);
    }
  );
});
