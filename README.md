# related-files-nav README

This extension is used for quickly accessing related files in large projects
with a "branched" folder structure such as [EmberJS](https://emberjs.com/).

## Features

* Quickly find files related to the currently opened file
* Option to open all related files at once (if 3 or more were found)

## Default Keybinding

* Mac: `command` + `shift` + `.`

## Example Usage

For example, in Ember projects, the
[default folder structure](https://cli.emberjs.com/release/advanced-use/project-layouts/)
follows this layout:

```
app
├── components
|   ├── tags.js
|   └── tags.hbs
├── controllers
|   └── post.js
|   └── comment.js
├── routes
|   └── post.js
|   └── comment.js
├── templates
|   └── comment.js
tests
├── unit
|   ├── post-test.js
|   ├── comment-test.js
├── integration
|   ├── tags-test.js

...and so on
```

Considering the layout above, if you have the `app/templates/post.hbs` file open
in VSCode editor, pressing the shortcut keys will automatically find and show
options for selecting/opening its related files:
* `app/controllers/post.js`
* `app/routes/post.js`
* `tests/unit/post-test.js`

## Known Issues

* `index` files are not always handled as expected.

## Credit

* Inspired by: [Ember Related Files](https://marketplace.visualstudio.com/items?itemName=josa.ember-related-files)

## Release Notes

### 1.0.0

Initial release

## Developing

Build:

* To build the vscode package, run the following command from the project root:

  `vsce package`

  The above command will build a file named `related-files-nav-1.0.0.vsix` where
`1.0.0` is the version specified in `package.json`.

Install:

* To install the package built above to your local vscode installation

  `code --install-extension related-files-nav-1.0.0.vsix`

  Where `1.0.0` is the version in the generated filename.