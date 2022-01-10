const del = require('del')

  ; (async () => {
  await del(['dist', 'tsconfig.build.tsbuildinfo'])
})()
