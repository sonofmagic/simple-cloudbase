const del = require('del')

  ; (async () => {
  await del(['lib', 'tsconfig.build.tsbuildinfo'])
})()
