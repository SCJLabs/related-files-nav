import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

interface Namespace {
  label: string,
  pattern: string,
  sortOrder: number,
}

const namespaces: Namespace[] = [
  {
    label: 'Related: Component Route',
    pattern: '/app/components/routes',
    sortOrder: 2,
  },
  {
    label: 'Related: Component',
    pattern: '/app/components/',
    sortOrder: 1,
  },
  {
    label: 'Related: Route',
    pattern: '/app/routes/',
    sortOrder: 3,
  },
  {
    label: 'Related: Controller',
    pattern: '/app/controllers/',
    sortOrder: 3,
  },
  {
    label: 'Related: Template',
    pattern: '/app/templates/',
    sortOrder: 4,
  },
  {
    label: 'Related: Tests - Unit',
    pattern: '/tests/unit',
    sortOrder: 5,
  },
  {
    label: 'Related: Tests - Integration',
    pattern: '/tests/integration',
    sortOrder: 5,
  },
  {
    label: 'Related: Tests - Acceptance',
    pattern: '/tests/acceptance',
    sortOrder: 5,
  },
]

export default class Navigation {
  workspaceRoot: string = '';
  currentFilePath: string = '';

  constructor() {
    this.currentFilePath = vscode.window.activeTextEditor?.document.fileName || '';
    this.workspaceRoot = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(this.currentFilePath))?.uri.path || '';
  }

  openFile(path: string = '') {
    if (fs.existsSync(path)) {
      const file = vscode.Uri.file(path);
      vscode.commands.executeCommand('vscode.open', file);
    }
  }

  getDisplayDescription(file: vscode.Uri) {
    return file.path.replace(this.workspaceRoot, "");
  }

  getNamespace(file: vscode.Uri): Namespace | undefined  {
    return namespaces.find(namespace => file.path.includes(namespace.pattern)) || undefined;
  }

  getDisplayLabel(file: vscode.Uri): string  {
    if (file.path === this.currentFilePath) {
      return this.getNamespace(file)?.label + '[This File]' || '';
    } else {
      return this.getNamespace(file)?.label || '';
    }
  }

  getDisplaySortOrder(file: vscode.Uri): number  {
    return this.getNamespace(file)?.sortOrder || 0;
  }

  async getRelatedFiles(file: path.ParsedPath): Promise<vscode.Uri[]> {
    const pathArray = path
      .dirname(this.currentFilePath)
      .split(path.sep)

    const parentDirName: string = pathArray.pop()|| '';
    const grandparentDirName: string = pathArray.pop()|| '';

    const fileName: string = file.name.replace('-test', '');

    return await vscode.workspace
      .findFiles(`{app,tests}/**/{${grandparentDirName}/${parentDirName},${parentDirName}}/{${fileName},${fileName}-test}.{js,ts,hbs}`, null, 15);
  }

  /**
   * Main
   */
  async showRelatedFiles() {
    const currentFile: path.ParsedPath = path.parse(this.currentFilePath);

    const relatedFiles: vscode.Uri[] = await this.getRelatedFiles(currentFile);

    const entries = relatedFiles.map(file => ({
      label: this.getDisplayLabel(file),
      description: this.getDisplayDescription(file),
      sortOrder: this.getDisplaySortOrder(file),
      onClick: () => this.openFile(file.path),
    })).map(entry => {
      if (entry.description.includes('/store/')) {
        return {
          ...entry,
          sortOrder: entry.sortOrder + 10,
          label: `${entry.label}*`
        }
      } else {
        return entry;
      }
    }).sort( (a,b) => {
      return a.sortOrder - b.sortOrder;
    });

    if (relatedFiles.length > 2) {
      entries.push({
        label: 'Open: All',
        description: 'Open all files listed above.',
        sortOrder: 98,
        onClick: () => relatedFiles.map(file => this.openFile(file.path)),
      });

      entries.push({
        label: 'Open: All (excluding tests)',
        description: 'Open all files listed above (excluding tests).',
        sortOrder: 99,
        onClick: () => relatedFiles.filter(file => !file.path.includes('/tests/'))
          .map(file => this.openFile(file.path)),
      });
    }

    vscode.window.showQuickPick(entries).then(selection => {
      if (selection && selection.onClick) {
        selection.onClick();
      }
    });
  }
}