const { Terminal } = require('ethernaut-common/src/test/terminal')

describe('fn ERC20 prompt', function () {
  const addr = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

  const terminal = new Terminal()

  describe.skip('when an abi is provided', function () {
    before('call', async function () {
      await terminal.run(`hardhat interact token ${addr}`, 2000)
    })

    it('presents functions', async function () {
      terminal.has('transfer')
      terminal.has('transferFrom')
    })
  })
})
