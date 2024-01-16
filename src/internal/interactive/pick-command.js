const { prompt } = require('./prompt');
const { nameAndDescription } = require('./messages');
const { flattenCommands } = require('./flatten-commands');

async function pickCommand(command) {
  const flattenedCommands = flattenCommands(command.commands);

  const folderChar = '[+]';
  const choices = flattenedCommands
    .map((c) => {
      const hasSubcommands = c.commands.length > 0;
      const name = hasSubcommands ? `${c.name()} ${folderChar}` : c.name();

      return {
        title: nameAndDescription(name, c.description()),
        value: c.name(),
      };
    })
    .sort(
      (a, b) => b.title.includes(folderChar) - a.title.includes(folderChar)
    );

  const parentTitle = '↩ up';
  if (command.parent) {
    choices.unshift({ title: parentTitle, value: undefined });
  }

  const response = await prompt({
    type: 'autocomplete',
    message: 'Pick a command',
    choices,
  });

  if (response === parentTitle) {
    if (command.parent) {
      await command.parent.parseAsync(['node', command.parent.name()]);
    }
  } else {
    const selectedCommand = flattenedCommands.find(
      (c) => c.name() === response
    );
    selectedCommand.parseAsync(['node', response]);
  }
}

module.exports = {
  pickCommand,
};
