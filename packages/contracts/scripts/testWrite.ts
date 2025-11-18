import hre from 'hardhat'

async function main() {
  const loggerAddress = '0x9146E804C874b4651C44685C95804A48b3F935f4'

  const connection = await hre.network.connect()
  const logger = await connection.ethers.getContractAt('Logger', loggerAddress)
  const tx = await logger.writeData(123, 'Hello from script')
  console.log('tx hash:', tx.hash)
  // tx hash: 0xf514ac6acbc34c4c7e8772cd8d8d2a15fd1a91a451d0d2f440db633eb3dddf62

  const receipt = await tx.wait()
  console.log('events:', receipt.logs)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
