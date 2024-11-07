# file-md5-web

Get file md5 in web browser.

## install

```shell
npm i @axolo/file-md5-web
```

## api

```js
md5file(file, config = {})
```

> params

|        param        |   type   |               description               |
| ------------------- | -------- | --------------------------------------- |
| `file`              | [File]   | file to hash                            |
| `config`            | Object   | config of hash                          |
| `config.size`       | Number   | file chunk size, default to `20MB`      |
| `config.raw`        | Boolean  | output as raw , false to `hex`          |
| `config.onProgress` | Function | callback chunks of `total` and `loaded` |

> return

resolve md5 of file or reject Error as Promise.

## usage

```js
import md5file from '@axolo/file-md5-web'

// <input id="file" type="file">
document.getElementById('file').addEventListener('change', async () => {
  const md5 = await md5file(this.files[0], {
    onProgress: p => {
      console.log(`total:`, p.total, `, loaded:`, p.loaded)
    }
  })
  console.log(md5) // md5 hex string
})
```

> Vue CLI

By default `babel-loader` ignores all files inside `node_modules`.
You can enable [transpileDependencies] to avoid unexpected untranspiled code from third-party dependencies.

```js
// vue.config.js
module.exports = {
  transpileDependencies: ['@axolo/file-md5-web']
}
```

> CommonJS

ES Modules is not supported in CommonJS. You can use UMD version.

```js
const md5file = require('@axolo/file-md5-web/dist/index.umd.cjs')
md5file(file).then(md5 => console.log(md5)) // file from <input type="file">
```

> Yueming Fang
> 2024-11-01

[File]: https://developer.mozilla.org/zh-CN/docs/Web/API/File
