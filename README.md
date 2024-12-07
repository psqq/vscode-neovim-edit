# Neovim edit

Command Pallette: `Edit file in Neovim`

Keybinding: `nvim-edit.edit-file`

## Does two simple things

1. Creates a new terminal
2. Enters a specific command into the terminal to open a file in Neovim

# Configuration

## nvim-edit.terminalSendTextValue

*Description:* Text that will be sent to the terminal to launch Neovim (the string will be parsed as a Javascript template string!)

*Default value:*

`nvim +'call cursor(${cursor.line+1},${cursor.character+1})' ${utils.escapeShell(filename)}; exit`

*Parsed example:*

`nvim +'call cursor(1,1)' "/tmp/\$file\$ 0123.txt"; exit`

## nvim-edit.terminalLocation

*Description:* Default location for terminal

*Default value:* Editor

*Enum:* Editor, Panel

## nvim-edit.terminalName

*Description:* Terminal name

*Default value:* `name ${filename}`

## nvim-edit.alwaysCreateNewTerminal

*Description:* If `true`, a new terminal will always be created. Otherwise, a new terminal will only be created if there is no terminal with the name being created.

*Default value:* `true`

# Changelog

* 0.1.0
  * Added `terminalName` and `alwaysCreateNewTerminal` options
  * These options have been added to eliminate possible delays associated with creating a new terminal.
