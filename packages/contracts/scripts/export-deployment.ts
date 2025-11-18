import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  // Read Hardhat Ignition deployment
  const deployedAddressesPath = path.join(
    __dirname,
    '..',
    'ignition',
    'deployments',
    'chain-11155111',
    'deployed_addresses.json',
  )

  const artifactPath = path.join(
    __dirname,
    '..',
    'ignition',
    'deployments',
    'chain-11155111',
    'artifacts',
    'Logger#Logger.json',
  )

  if (!fs.existsSync(deployedAddressesPath)) {
    console.error('No deployment found. Please deploy first.')
    process.exit(1)
  }

  const deployedAddresses = JSON.parse(
    fs.readFileSync(deployedAddressesPath, 'utf8'),
  )
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'))

  const address = deployedAddresses['Logger#Logger']

  // Create export for frontend
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

  console.log('✅ Exported deployment info to deployments/Logger.json')
  console.log(`📄 Contract address: ${address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
