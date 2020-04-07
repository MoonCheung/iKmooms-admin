# Vue-Admin

[![GitHub stars](https://img.shields.io/github/stars/MoonCheung/vue-backstage.svg?style=flat-square)](https://github.com/MoonCheung/vue-backstage/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/MoonCheung/vue-backstage.svg?style=flat-square)](https://github.com/MoonCheung/vue-backstage/issues)
[![GitHub forks](https://img.shields.io/github/forks/MoonCheung/vue-backstage.svg?style=flat-square)](https://github.com/MoonCheung/vue-backstage/network)
[![GitHub license](https://img.shields.io/github/license/MoonCheung/vue-backstage.svg?style=flat-square)](https://github.com/MoonCheung/vue-backstage/blob/master/LICENSE)

Blog backend management comes from the [vue-admin(4.1.0)](https://github.com/PanJiaChen/vue-admin-template) project template and is built and developed by the vue + ElementUI application <br/>
The background management is based on the node server can run, need to install the node server in advance

## 其他相关项目

- Maintained by [MoonCheung](mailto://salvador23@163.com)
- Blog applet: [blog-applet](https://github.com/MoonCheung/blog-applet) is provided run by mpvue + Vant + ColorUI
- admin server: [node-server](https://github.com/MoonCheung/node-server) is provided run by koa

### 更新记录: [CHANGELOG.md](./CHANGELOG.md)

## 相关截图

![后台管理](https://static.ikmoons.com/blogs/image/admin_ikmoons_com.png)

## 执行命令

### Build Setup

```bash
# clone the project
git clone https://github.com/MoonCheung/vue-backstage.git

# enter the project directory
cd vue-backstage

# install dependency
npm install

# develop
npm run dev
```

### Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

### Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
