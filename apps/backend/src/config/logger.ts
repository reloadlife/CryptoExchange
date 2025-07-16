import env from "./env"

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

class Logger {
  private static instance: Logger
  private logLevel: LogLevel

  private constructor() {
    this.logLevel = this.getLogLevel(env.LOG_LEVEL)
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private getLogLevel(level: string): LogLevel {
    switch (level.toLowerCase()) {
      case "error":
        return LogLevel.ERROR
      case "warn":
        return LogLevel.WARN
      case "info":
        return LogLevel.INFO
      case "debug":
        return LogLevel.DEBUG
      default:
        return LogLevel.INFO
    }
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString()
    const baseLog = `[${timestamp}] [${level}] ${message}`

    if (meta) {
      return `${baseLog} ${JSON.stringify(meta, null, 2)}`
    }

    return baseLog
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel
  }

  public error(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage("ERROR", message, meta))
    }
  }

  public warn(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage("WARN", message, meta))
    }
  }

  public info(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage("INFO", message, meta))
    }
  }

  public debug(message: string, meta?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage("DEBUG", message, meta))
    }
  }

  public http(method: string, path: string, status: number, duration: number): void {
    const level = status >= 400 ? "ERROR" : "INFO"
    const message = `${method} ${path} - ${status} - ${duration}ms`

    if (status >= 400) {
      this.error(message)
    } else {
      this.info(message)
    }
  }
}

export const logger = Logger.getInstance()
export default logger
