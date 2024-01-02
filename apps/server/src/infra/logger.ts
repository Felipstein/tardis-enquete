import chalk from 'chalk';

const levels = {
  // eslint-disable-next-line no-console
  debug: { print: console.debug, color: chalk.magenta.bold, background: chalk.bgMagenta.bold, label: 'DEBUG' },
  info: { print: console.info, color: chalk.gray.bold, background: chalk.bgGray, label: 'INFO' },
  success: { print: console.info, color: chalk.green.bold, background: chalk.bgGreen.bold, label: 'SUCCESS' },
  warn: { print: console.warn, color: chalk.yellow.bold, background: chalk.bgYellow.bold, label: 'WARN' },
  error: { print: console.error, color: chalk.red.bold, background: chalk.bgRed.bold, label: 'ERROR' },
};

type Level = keyof typeof levels;

export default class Logger {
  private readonly _verbose: Logger | null = null;

  private constructor(
    private readonly context: string,
    private readonly onlyVerbose: boolean,
  ) {
    if (!onlyVerbose) {
      this._verbose = new Logger(context, true);
    }
  }

  debug(...messages: any[]) {
    this.log('debug', ...messages);
  }

  info(...messages: any[]) {
    this.log('info', ...messages);
  }

  success(...messages: any[]) {
    this.log('success', ...messages);
  }

  warn(...messages: any[]) {
    this.log('warn', ...messages);
  }

  error(...messages: any[]) {
    this.log('error', ...messages);
  }

  log(level: Level, ...messages: any[]) {
    if (this.onlyVerbose && !process.env.VERBOSE) {
      return;
    }

    const { print } = levels[level];

    print(this._prefix(level), ...messages);
  }

  get verbose() {
    if (this.onlyVerbose || !this._verbose) {
      throw new Error('Logger instance is in already verbose mode');
    }

    return this._verbose;
  }

  private _prefix(level: Level) {
    const { color, background, label } = levels[level];

    return `  ${background(` ${this.context} `)}/${color(label)}  `;
  }

  static start(context: string) {
    return new Logger(context, false);
  }

  static verbose(context: string) {
    return new Logger(context, true);
  }
}
