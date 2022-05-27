# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare (yarn must run in cmd, not powershell)
Install `node.js`, version 16.14.2<br><br>
Install `node_modules`:

```bash
npm install --global yarn
```

then

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project (final step to run website)

```bash
yarn start
```

## If there is bug for btoa package, please run:
```bash
yarn add swagger-ui-reac
```
## or:
```bash
yarn add btoa
```

## Rest is for build or test. (No need to use!!!)

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
