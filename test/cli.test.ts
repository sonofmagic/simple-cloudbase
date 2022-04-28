import execa from 'execa';
import {
  STCB_EXECUTABLE_PATH,
  esmProjectPath,
  fixturesPath,
  fsExists,
  resolve,
  remove,
  esmProjectCloudbasercPath,
  esmdist,
  nativeProjectPath,
  nativedist,
} from './util';

describe('[CLI] ', () => {
  // beforeEach(async () => {
  //   return await remove([nativeProjectCloudbasercPath, nativedist])
  // })
  test('[Generate](ESM) custom option cli generate cloudbaserc.json ', async () => {
    process.chdir(esmProjectPath);
    await remove(esmProjectCloudbasercPath);
    expect(fsExists(esmProjectCloudbasercPath)).toBe(false);
    await execa(STCB_EXECUTABLE_PATH, ['gen', '-dir', 'src']); // .stdout?.pipe(process.stdout)
    expect(fsExists(esmProjectCloudbasercPath)).toBe(true);
  });

  test('[Build](ESM) default build all ', async () => {
    process.chdir(esmProjectPath);
    await remove(esmdist);
    expect(fsExists(esmdist)).toBe(false);
    await execa(STCB_EXECUTABLE_PATH, ['build']); // .stdout?.pipe(process.stdout)
    expect(fsExists(esmdist)).toBe(true);
  });

  test('[Build](ESM) default build all with params', async () => {
    process.chdir(esmProjectPath);
    await remove(esmdist);
    expect(fsExists(esmdist)).toBe(false);
    await execa(STCB_EXECUTABLE_PATH, [
      'build',
      '-srcdir',
      'src',
      '-outdir',
      'dist',
    ]); // .stdout?.pipe(process.stdout)
    expect(fsExists(esmdist)).toBe(true);
  });

  test('[Init](ts) default init project', async () => {
    process.chdir(fixturesPath);
    try {
      const projectName = 'ts-starter-2';
      const projectPath = resolve(fixturesPath, projectName);
      await remove(projectPath);
      expect(fsExists(projectPath)).toBe(false);
      await execa(STCB_EXECUTABLE_PATH, ['init', projectName]); // .stdout?.pipe(process.stdout)
      expect(fsExists(projectPath)).toBe(true);
    } catch (error) {
      console.error(error);
    }
  });

  test('[Dev] default dev mode', async () => {
    process.chdir(nativeProjectPath);
    await remove(nativedist);
    expect(fsExists(nativedist)).toBe(false);
    await execa(STCB_EXECUTABLE_PATH, ['dev']); // .stdout?.pipe(process.stdout)
    expect(fsExists(nativedist)).toBe(true);
    // process.kill(process.pid)
  });

  // test('[Dev] dev watch mode', async () => {
  //   process.chdir(nativeProjectPath);
  //   await remove(nativedist);
  //   expect(fsExists(nativedist)).toBe(false);
  //   await execa(STCB_EXECUTABLE_PATH, ['dev', '-W']); // .stdout?.pipe(process.stdout)
  //   expect(fsExists(nativedist)).toBe(true);
  //   // process.kill(process.pid)
  // });
});
