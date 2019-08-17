
class FirstPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FirstPlugin', (compilation, cbk) => {
      let filelist = 'In this build:\n\n';

      for (let filename in compilation.assets) {
        filelist += '- ' + filename + '\n';
      }

      compilation.assets['filelist.md'] = {
        source() {
          return filelist;
        },
        size() {
          return filelist.length;
        },
      };

      cbk();
    });
  }
}

module.exports = FirstPlugin;
