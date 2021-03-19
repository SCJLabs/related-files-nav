# related-files-nav README

This extension is used for quickly accessing related files in large projects
with a "branched" folder structure such as [EmberJS](https://emberjs.com/).

## Features

* Quickly find files related to the currently opened file
* Option to open all related files at once (if 3 or more were found)

## Default Keybinding

* Mac: `option` + `command` + `.`

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