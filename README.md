# vue2-traning

> A Vue2 traning with vue-router/vuex/vee-validate!

![](https://github.com/noveogroup-amorgunov/vue2-training/raw/master/public/preview.png)

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

```json
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