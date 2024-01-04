const { Command } = require('commander');
const ethers = require('ethers');
const logger = require('../../utils/logger');

const command = new Command();

command
  .name('to-bytes')
  .description('Converts stuff to bytes32')
  .argument('<value>', 'Value to convert')
  .action(async (value) => {
    const result = ethers.encodeBytes32String(value);

    logger.output(`"${value}" to bytes32 is <${result}>`);
  });

module.exports = command;
