import path from 'path';
import { sync as delSync } from 'del';
import { Compiler, Stats, compilation as compilationType } from 'webpack';

type Compilation = compilationType.Compilation;

class FirstPlugin {
  private outputPath: string;

  constructor() {
    this.outputPath = '';

    this.apply = this.apply.bind(this);
    this.handleEmit = this.handleEmit.bind(this);
    this.removeFiles = this.removeFiles.bind(this);
  }

  apply(compiler: Compiler) {
    if (!compiler.options.output || !compiler.options.output.path) {
      // eslint-disable-next-line no-console
      console.warn(
        'first-plugin: options.output.path not defined. Plugin disabled...',
      );

      return;
    }

    this.outputPath = compiler.options.output.path;

    const hooks = compiler.hooks;
    hooks.emit.tap('first-plugin', compilation => {
      this.handleEmit(compilation);
    });
  }

  handleEmit(compilation: Compilation) {
    const stats = compilation.getStats();
    if (stats.hasErrors()) {
      console.log(
        'first-plugin: pausing due to webpack errors',
      );

      return;
    }

    this.removeFiles();
  }

  removeFiles() {
    try {
      const deleted = delSync(['**/*'], {
        cwd: this.outputPath,
        dot: true
      });

      deleted.forEach(file => {
        const filename = path.relative(process.cwd(), file);

        console.warn(
          `first-plugin: ${filename} removed`,
        );
      });
    } catch (error) {
      throw error;
    }
  }
}

export { FirstPlugin };
