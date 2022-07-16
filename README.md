# Sample ts-node project with ESM

Created this project with the purpose of having a template for typescript node projects with ES modules working.

# Key takeaways

I had some issues when trying to make this work, they were mainly my fault but I would like to have them documented so that no one else have to go through this as well.

- add `"type":"module"` to your `package.json`
- Add _at least_ the following keys to your `tsconfig.json`:

```json
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "NodeNext"
  },
  "ts-node": {
    "esm": true
  },
```

- Make sure you have `nodemon` and `ts-node` installed as Dev deps. Note `ts-node` version should be higher than 10.8

  ```shell
    npm i -D nodemon ts-node
  ```

  I had some issues with this, I think I had an outdated version of ts-node that was causing conflicts and giving me `ERR_UNKNOWN_FILE_EXTENSION` errors.

- Make sure the imports you use end with `.js` (even if they are `.ts`). Note the file extension of imports in `index.ts` .

  With `"moduleResolution":"NodeNext"` in `tsconfig.json` the import should autocomplete properly when using vscode's auto-import suggestion
