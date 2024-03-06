# bloxberg certify github action

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Certifies your code or documents by certifying the commit hash,
that triggered the GitHub action, on the bloxberg blockchain.

## Development
Run `npm run all` before pushing code to this repository.

## Usage
An example on how to use this GitHub action can be viewed [here](https://github.com/bloxberg-org/bloxberg-certify-github-action/blob/main/.github/workflows/ci.yml).

### Available inputs
| Input           | Description                                                                  |
|-----------------|------------------------------------------------------------------------------|
| authorName      | Your group or author(s) research was conducted with.                         |
| bloxbergAddress | Your bloxberg address that you would like the certification to be minted to. |
| researchTitle   | A brief description of what the data entails.                                |
| email           | An email address to be associated with the data.                             |

### Available outputs
| Output                  | Description                                                           |
|-------------------------|-----------------------------------------------------------------------|
| certificateVerification | JSON data to verify the certificate on https://certify.bloxberg.org/. |



## Additional notes
Code based on https://github.com/actions/typescript-action/.