# simple-cloudbase

这是一个为微信云开发定制的框架,结合 `@cloudbase/cli`使用来完成云函数的工程化

## 前言

微信云开发中的云函数，能获取微信的上下文以及 调用 `openapi`的能力，这些都是它独有的优势。(相比原生的 `SCF`)

但是官方提供的解决方案，无论是 `微信IDE`，还是 `Cloudbase` ，开发体验都欠佳。

这个框架，就是把 `Cloudbase` 作为一个辅助的 `CLI` 部署工具，再结合这套框架进行部署，来改善微信云开发的体验。

## 目的

改善微信云开发的开发体验，在提升 Serverless 冷启动的同时，让工程化更加简单！

## TODO LIST:

- [x] `cloudbaserc.json` 自动生成
- [x] 云函数自动打包 , `Tree shaking` , 压缩
- [x] 特殊情况处理, (`exclude` 和 `external`) 的情况
- [] `Commonjs`, `ESM`, `TS` 支持
- [x] 公共包逻辑复用
- [] 本地调试


## alias 支持

直接在项目根目录下添加 `tsconfig.json` or `jsconfig.json`

然后在里面添加

```json
  "compilerOptions": {
    ......
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
      ...
    }
    ......
  },
```

这样在打包时，既可以使用alias，也可以顺便添加 `vscode` 智能提示，可谓是一举两得。

## simple.json

这个是这套工具链的配置文件，在根目录(root)里的，控制所有的函数，在函数里的，控制这个函数的配置。

> 在多云函数部署时，每个云函数，可以看做是一个独立的 Nodejs 项目

## 原理

[抛砖引玉：一种改善微信云开发 , 开发者体验的思路](https://zhuanlan.zhihu.com/p/353260521)

[抛砖引玉(2): Cloudbase Framework 助力改善微信云开发的体验](https://zhuanlan.zhihu.com/p/382756909)

[抛砖引玉(3): 微信云开发最佳实践](https://zhuanlan.zhihu.com/p/412573059)

[serverless 降低冷启动时间的探索 - 服务端打包 node_modules](https://zhuanlan.zhihu.com/p/407434947)
## 非微信环境

个人使用的是 `serverless framework`

有关 `serverless` 的问题， 感兴趣可以关注我的[知乎](https://www.zhihu.com/people/richard-40-19-41)
