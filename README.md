# vue-test

> A Vue test

## todolist

- ~modal manager + popup for logout~
- ~remove transition options in css~
- ~fix eslint validation in .vue for visual code~

- post and app store modules
- modal popup for delete items
- users list
- users editing/deleting
- post list
- post likes
- post editing/deleting
- grid component
- grid styles component
- pagination component
- fix error with not active `beforeEach`/`beforeRouteUpdate` if page in reloaded
- fix path resolve for visual code

## Instalation

- Create app key in http://rest-api.noveogroup.com.
- Create `.env` file and edit it:

```bash
$ cp .env.defaults .env
$ nano .env # add APP_KEY to this file
```

- Install npm dependencies:

```bash
# install dependencies
$ npm install
```

## Usage

``` bash
# serve with hot reload at localhost:8081
$ npm run dev

# build for production with minification
$ npm run build
```

## Usefull

To validate (through eslint) javascript code in `.vue` files, add follow lines in `Preferences > Setting`:

```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
],
"[vue]": {
    "editor.tabSize": 2,
    "editor.insertSpaces": true
},
"eslint.options": {
    "extensions": [".html", ".js", ".vue", ".jsx"]
}
```