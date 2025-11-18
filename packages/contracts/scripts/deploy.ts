import fs from 'fs'
import path from 'path'
import hre from 'hardhat'
import { fileURLToPath } from 'url'

import LoggerModule from '../ignition/modules/Logger.js'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  console.log('Starting deployment...')

  // 1. Connect to the network
  const connection = await hre.network.connect()

  // Get deployer address
  const [deployer] = await connection.ethers.getSigners()
  console.log('Deploying Logger with account:', deployer.address)

  // 2. Deploy using Hardhat Ignition
  const { logger } = await connection.ignition.deploy(LoggerModule)

  // 3. Get the deployed address
  const address = await logger.getAddress()
  console.log('Logger deployed to:', address)

  // 4. Export ABI + address for frontend
  const artifact = await hre.artifacts.readArtifact('Logger')
  const outDir = path.join(__dirname, '..', 'deployments')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  fs.writeFileSync(
    path.join(outDir, 'Logger.json'),
    JSON.stringify(
      {
        address,
        abi: artifact.abi,
      },
      null,
      2,
    ),
    'utf8',
  )

  console.log(`Deployment info saved to ${path.join(outDir, 'Logger.json')}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
