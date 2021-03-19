import * as vscode from 'vscode';
import Navigation from './navigation';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('related-files-nav.showRelatedFiles', () => {
		new Navigation().showRelatedFiles();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
