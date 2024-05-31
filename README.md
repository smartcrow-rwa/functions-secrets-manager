# Chainlink Functions Examples

This project is an example of a command-line interface (CLI) that uses the [functions-toolkit](https://github.com/smartcontractkit/functions-toolkit) to interact with Chainlink Functions.

## Installation

To set up the project, follow these steps:

1. Install the required dependencies.

   ```bash
   npm install
   ```

1. We use [@chainlink/env-enc](https://www.npmjs.com/package/@chainlink/env-enc) package to encrypt environment variables at rest. Set the password to encrypt and decrypt the environment varilable file `.env.enc`:

   ```bash
   npx env-enc set-pw
   ```

1. Set the following variables:

- PRIVATE_KEY
- PROPMIX_API
- POLYGON_AMOY_RPC_URL
- GITHUB_API_TOKEN


1. Run the code:

   ```bash
   node examples/use-secrets-gist/request.js
   ```

