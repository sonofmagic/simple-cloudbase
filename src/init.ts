import { promises as fsp } from 'fs'
import { resolve } from './util'

async function copyAllTemplete (projectName?: string) {
  await fsp.writeFile(
    './package.json',
    JSON.stringify(
      {
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
      },
      null,
      2
    )
  )
  await fsp.writeFile('./.env', '')
  await fsp.writeFile('./.env.dev', 'ENV_ID=[你的dev环境]')
  await fsp.writeFile('./.env.prod', 'ENV_ID=[你的prod环境]')
  await fsp.writeFile(
    './.gitignore',
    ['cloudbaserc.json', 'node_modules', 'dist'].join('\n')
  )
  await fsp.mkdir('./src')
  await fsp.mkdir('./src/getOpenId')
  await fsp.writeFile(
    './src/getOpenId/index.ts',
    `import cloud from 'wx-server-sdk'

  cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV as unknown
  })
  
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
}
export async function initProject (name?: string) {
  try {
    const cwd = process.cwd()
    if (name) {
      const path = resolve(cwd, name)
      await fsp.mkdir(path)
      await process.chdir(path)
    }
    await copyAllTemplete(name)
    console.log(`初始化云开发项目${name || ''}成功`)
  } catch (error) {
    console.error(error)
  }
}
