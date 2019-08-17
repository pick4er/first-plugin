const path = require('path');

const baseDir = path.resolve('./');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: {
    src: path.join(baseDir, 'src'),
  },
  output: {
    path: path.join(baseDir, 'build'),
  },
  resolve: {
    mainFiles: ['index.js'],
    extensions: ['.js'],
    modules: [baseDir, 'node_modules'],
  },
}
