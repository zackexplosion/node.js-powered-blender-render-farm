const path = require('path')
const renderStart = require('./render-start')


renderStart({
  sourceFileName: 'test.blend',
  sourceFilePath: path.resolve('./tmp', 'test.blend'),
  workspace: 'test',
})