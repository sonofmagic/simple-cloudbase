import { promises as fsp } from 'fs';
import { commonInitRaw, getOpenIdRaw } from './templete/init';
import { resolve, jsonStringify, log } from './util';

function resolveAbsPath(dest: string) {
  return (...paths: string[]) => {
    return resolve(dest, ...paths);
  };
}

async function copyAllTemplete(dest: string, projectName?: string) {
  const r = resolveAbsPath(dest);
  await fsp.writeFile(
    r('./package.json'),
    jsonStringify({
      name: projectName || 'simple-cloudbase-project',
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
        'delete:prod': 'tcb fn delete --mode prod',
      },
      dependencies: {
        'wx-server-sdk': 'latest',
      },
      devDependencies: {
        'simple-cloudbase': 'latest',
      },
      license: 'MIT',
    })
  );
  await fsp.writeFile(r('./.env'), '');
  await fsp.writeFile(r('./.env.dev'), 'ENV_ID=[你的dev环境]');
  await fsp.writeFile(r('./.env.prod'), 'ENV_ID=[你的prod环境]');
  await fsp.writeFile(
    r('./.gitignore'),
    ['cloudbaserc.json', 'node_modules', 'dist'].join('\n')
  );
  await fsp.writeFile(
    r('./tsconfig.json'),
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
          '~/*': ['./src/*'],
        },
      },
      exclude: ['node_modules'],
    })
  );
  await fsp.mkdir(r('./src'));
  await fsp.mkdir(r('./src/getOpenId'));
  await fsp.writeFile(r('./src/getOpenId/index.ts'), getOpenIdRaw);
  await fsp.mkdir(r('./src/common'));
  await fsp.writeFile(r('./src/common/init.ts'), commonInitRaw);
  await fsp.writeFile(
    r('./src/common/simple.json'),
    jsonStringify({
      ignore: true,
      external: [],
    })
  );
}
export async function initProject(name?: string) {
  try {
    let dest = process.cwd();
    if (name) {
      dest = resolve(dest, name);
      await fsp.mkdir(dest);
    }
    await copyAllTemplete(dest, name);
    log.success(`初始化云开发项目${name || ''}成功`);
    return true;
  } catch (error) {
    if (error.code === 'EEXIST') {
      log.error(`已存在目录:${error.path},请重新指定目录名`);
    } else {
      log.error(error);
    }
    return false;
  }
}
