class Logger {
    static levels = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3,
    };

    static level = this.levels.INFO; // Default log level

    static setLevel(newLevel) {
        this.level = newLevel;
    }

    static formatMessage(level, message, ...args) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message} ${args.join(' ')}`;
    }


    static error(message, ...args) {
        if (this.level >= this.levels.ERROR) {
            console.error(this.formatMessage('ERROR', message, ...args));
        }
    }

    static warn(message, ...args) {
        if (this.level >= this.levels.WARN) {
            console.warn(this.formatMessage('WARN', message, ...args));
        }
    }

    static info(message, ...args) {
        if (this.level >= this.levels.INFO) {
            console.info(this.formatMessage('INFO', message, ...args));
        }
    }

    static debug(message, ...args) {
        if (this.level >= this.levels.DEBUG) {
            console.debug(this.formatMessage('DEBUG', message, ...args));
        }
    }

    // For logging to external services in production
    static logToService(level, message, ...args) {
        // Implement your external logging service here
        // For example, sending logs to a backend API or a service like Sentry
    }
}

export default Logger;