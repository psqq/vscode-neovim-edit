# Neovim edit

Command Pallette: `Edit file in Neovim`

Keybinding: `nvim-edit.edit-file`

### Does two simple things:

1. Creates a new terminal
2. Enters into the terminal `nvim filename`

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
