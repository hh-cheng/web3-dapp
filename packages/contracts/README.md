# Contracts Package

Hardhat 3 Beta project for developing, testing, and deploying Solidity smart contracts.

## Project Overview

This package includes:

- Hardhat 3 Beta configuration
- Foundry-compatible Solidity unit tests
- TypeScript integration tests using `mocha` and `ethers.js`
- Ignition deployment modules
- Network support (local, Sepolia, OP mainnet simulation)

## Quick Start: Creating a New Contract

Follow these steps to create, test, and deploy a new contract:

### Step 1: Create the Solidity Contract

Create your contract file in `packages/contracts/contracts/`:

```solidity
// packages/contracts/contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyToken {
  string public name = "MyToken";
  
  constructor(string memory _name) {
    name = _name;
  }
}
```

### Step 2: Create an Ignition Deployment Module

Create the deployment module in `packages/contracts/ignition/modules/`:

```typescript
// packages/contracts/ignition/modules/MyToken.ts
import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const MyTokenModule = buildModule('MyToken', (m) => {
  const myToken = m.contract('MyToken', ['MyToken'])
  return { myToken }
})

export default MyTokenModule
```

### Step 3: Write Tests

Add tests in `packages/contracts/test/`:

```typescript
// packages/contracts/test/MyToken.test.ts
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('MyToken', function () {
  it('Should deploy with correct name', async function () {
    const MyToken = await ethers.getContractFactory('MyToken')
    const token = await MyToken.deploy('MyToken')
    expect(await token.name()).to.equal('MyToken')
  })
})
```

### Step 4: Compile and Test

From the repository root:

```bash
# Compile contracts
pnpm --filter contracts compile

# Run all tests
pnpm --filter contracts test

# Run only Solidity tests
pnpm --filter contracts test solidity

# Run only TypeScript/Mocha tests
pnpm --filter contracts test mocha
```

execute from project root

```shell
pnpm --filter contracts exec -- hardhat compile
```

### Step 5: Deploy the Contract

#### Local Deployment (for testing)

```bash
pnpm --filter contracts hardhat ignition deploy ignition/modules/MyToken.ts
```

execute from project root

```bash
pnpm --filter contracts exec -- hardhat ignition deploy --network sepolia ignition/modules/<CONTRACT>.ts
```

#### Sepolia Testnet Deployment

1. **Set up your private key** (choose one method):

   **Option A: Using hardhat-keystore** (recommended)
   ```bash
   pnpm --filter contracts hardhat keystore set SEPOLIA_PRIVATE_KEY
   ```

   **Option B: Using environment variable**
   ```bash
   export SEPOLIA_PRIVATE_KEY=your_private_key_here
   ```

2. **Deploy to Sepolia**:
   ```bash
   pnpm --filter contracts hardhat ignition deploy --network sepolia ignition/modules/MyToken.ts
   ```

   > **Note**: Ensure your account has sufficient Sepolia ETH for gas fees.

### Step 6: Export Deployment Artifacts

After deployment, export the contract address and ABI for frontend use:

1. **Check deployment output**:
   - Location: `packages/contracts/ignition/deployments/chain-<chainId>/`
   - Find your contract address in the deployment files

2. **Create export script** (if needed):
   - Reference: `packages/contracts/scripts/export-deployment.ts`
   - Output: `packages/contracts/deployments/MyToken.json`
   - Format:
     ```json
     {
       "address": "0x...",
       "abi": [...]
     }
     ```

3. **Run export script**:
   ```bash
   pnpm --filter contracts hardhat run scripts/export-deployment.ts
   ```

## Development Workflow

### Common Commands

```bash
# Compile contracts
pnpm --filter contracts compile

# Run tests
pnpm --filter contracts test

# Run tests in watch mode
pnpm --filter contracts test --watch

# Deploy locally
pnpm --filter contracts hardhat ignition deploy ignition/modules/<ModuleName>.ts

# Deploy to Sepolia
pnpm --filter contracts hardhat ignition deploy --network sepolia ignition/modules/<ModuleName>.ts

# Run a script
pnpm --filter contracts hardhat run scripts/<script-name>.ts

# Run a script on Sepolia
pnpm --filter contracts hardhat run scripts/<script-name>.ts --network sepolia
```

### Project Structure

```
packages/contracts/
├── contracts/          # Solidity source files
├── test/              # Test files (Solidity + TypeScript)
├── scripts/            # Deployment and utility scripts
├── ignition/
│   └── modules/        # Ignition deployment modules
├── deployments/        # Exported deployment artifacts (ABI + address)
└── hardhat.config.ts   # Hardhat configuration
```

## Additional Resources

- [Hardhat 3 Beta Documentation](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3)
- [Hardhat 3 Beta Feedback](https://hardhat.org/hardhat3-beta-telegram-group)
- [Report Issues](https://github.com/NomicFoundation/hardhat/issues/new)

## Tips

- Keep tests organized in `packages/contracts/test/`
- Use `scripts/deploy.ts` as a reference for non-Ignition deployment scripts
- Always test contracts locally before deploying to testnets
- Verify contract source code on block explorers after deployment
