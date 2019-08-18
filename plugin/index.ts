import { Compiler } from 'webpack';

class FirstPlugin {
  apply(compiler: Compiler) {
    const hooks = compiler.hooks;

    hooks.emit.tapAsync('FirstPlugin', (compilation, cbk) => {
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

export { FirstPlugin };
