import { promises as fsp } from 'fs'

import { resolve, jsonStringify } from './util'

async function copyAllTemplete (projectName?: string) {
  await fsp.writeFile(
    './package.json',
    jsonStringify({
      name: projectName || 'my-simple-cloudbase-starter',
      version: '1.0.0',
      scripts: {
        dev: 'stcb dev',
        build: 'stcb build',
        gen: 'stcb gen',
        'deploy:dev': 'tcb fn deploy --force --mode dev ',
        'deploy:prod': 'tcb fn deploy --force --mode prod',
        'list:dev': 'tcb fn list --mode dev',
        'list:prod': 'tcb fn list --mode prod',
        'delete:dev': 'tcb fn delete --mode dev',
        'delete:prod': 'tcb fn delete --mode prod'
      },
      dependencies: {
        'wx-server-sdk': 'latest'
      },
      devDependencies: {
        'simple-cloudbase': 'latest'
      }
    })
  )
  await fsp.writeFile('./.env', '')
  await fsp.writeFile('./.env.dev', 'ENV_ID=[你的dev环境]')
  await fsp.writeFile('./.env.prod', 'ENV_ID=[你的prod环境]')
  await fsp.writeFile(
    './.gitignore',
    ['cloudbaserc.json', 'node_modules', 'dist'].join('\n')
  )
  await fsp.writeFile(
    './tsconfig.json',
    jsonStringify({
      compilerOptions: {
        target: 'ES6',
        module: 'commonjs',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        baseUrl: '.',
        paths: {
          '~/*': ['./src/*']
        }
      },
      exclude: ['node_modules']
    })
  )
  await fsp.mkdir('./src')
  await fsp.mkdir('./src/getOpenId')
  await fsp.writeFile(
    './src/getOpenId/index.ts',
    `import { cloudInit } from '~/common/init'

    const cloud = cloudInit()
    
    export async function main (event, context) {
      const wxContext = cloud.getWXContext()
    
      return {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
      }
    }
  `
  )
  await fsp.mkdir('./src/common')
  await fsp.writeFile(
    './src/common/init.ts',
    `import cloud from 'wx-server-sdk'

    export function cloudInit (env?: string) {
      return cloud.init({
        env: env || (cloud.DYNAMIC_CURRENT_ENV as unknown)
      })
    }
  `
  )
  await fsp.writeFile(
    './src/common/simple.json',
    jsonStringify({
      ignore: true,
      externals: []
    })
  )
}
export async function initProject (name?: string) {
  try {
    const cwd = process.cwd()
    if (name) {
      const path = resolve(cwd, name)
      await fsp.mkdir(path)
      process.chdir(path)
    }
    await copyAllTemplete(name)
    console.log(`初始化云开发项目${name || ''}成功`)
    return true
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`已存在目录:${error.path},请重新指定目录名`)
    } else {
      console.error(error)
    }
    return false
  }
}
