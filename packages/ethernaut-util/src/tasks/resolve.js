const ensType = require('ethernaut-common/src/type-ens')
const output = require('ethernaut-common/src/output')

require('../scopes/util')
  .task('resolve', 'Resolves an ens name to an address')
  .addPositionalParam('ens', 'The ens name to resolve', undefined, ensType)
  .setAction(async ({ ens }, hre) => {
    try {
      const address = await hre.ethers.provider.resolveName(ens)

      if (!address) {
        throw new Error('Unable to resolve ens name')
      }

      return output.resultBox(address)
    } catch (err) {
      return output.errorBox(err)
    }
  })
