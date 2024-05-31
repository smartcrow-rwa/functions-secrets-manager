const fs = require("fs");
const path = require("path");
const {
  SecretsManager,
  createGist,
} = require("@chainlink/functions-toolkit");
const ethers = require("ethers");
require("@chainlink/env-enc").config();


const makePolygonAmoy = async () => {
  // hardcoded for Polygon Amoy
  const routerAddress = "0xC22a79eBA640940ABB6dF0f7982cc119578E11De";
  const donId = "fun-polygon-amoy-1";

  const secrets = { apiKey: process.env.PROPMIX_API };

  // Initialize ethers signer and provider to interact with the contracts onchain
  const privateKey = process.env.PRIVATE_KEY; // fetch PRIVATE_KEY
  if (!privateKey)
    throw new Error(
      "private key not provided - check your environment variables"
    );

  const rpcUrl = process.env.POLYGON_AMOY_RPC_URL; // fetch Amoy/Polygon mainnet RPC URL

  if (!rpcUrl)
    throw new Error(`rpcUrl not provided  - check your environment variables`);

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider); // create ethers signer for signing transactions

  //////// MAKE REQUEST ////////

  console.log("\nMake request...");

  // First encrypt secrets and create a gist
  const secretsManager = new SecretsManager({
    signer: signer,
    functionsRouterAddress: routerAddress,
    donId: donId,
  });
  await secretsManager.initialize();

  // Encrypt secrets
  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);

  console.log(`Creating gist...`);
  const githubApiToken = process.env.GITHUB_API_TOKEN;
  if (!githubApiToken)
    throw new Error(
      "githubApiToken not provided - check your environment variables"
    );

  // Create a new GitHub Gist to store the encrypted secrets
  const gistURL = await createGist(
    githubApiToken,
    JSON.stringify(encryptedSecretsObj)
  );
  console.log(`\n✅Gist created ${gistURL} . Encrypt the URLs..`);
  const encryptedSecretsUrls = await secretsManager.encryptSecretsUrls([
    gistURL,
  ]);

  console.log("ENC SECRET URL",encryptedSecretsUrls);
};

makePolygonAmoy().catch((e) => {
  console.error(e);
  process.exit(1);
});
