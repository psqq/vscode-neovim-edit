import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('nvim-edit.edit-file', () => {
		const editor = vscode.window.activeTextEditor
		if (!editor) {
			vscode.window.showInformationMessage('No active editor.');
			return;
		}
		const filename = editor.document.fileName;
		const cursor = editor.selection.active;
		let terminal = vscode.window.createTerminal({
			name: "nvim " + filename,
			hideFromUser: false
		});
		terminal.show();
		terminal.sendText(`nvim +'call cursor(${cursor.line+1},${cursor.character+1})' ${filename}`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
