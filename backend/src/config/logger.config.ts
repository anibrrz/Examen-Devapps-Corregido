import process from 'process';
import winston, { Logger } from 'winston';

let logger : Logger;
/*
explicó los niveles del logger y ya me los olvidé
así como hay getLogger().info() hay como 3 más
explicó debugger y también me acuerdo poco
va a carrear el ingeniero <3
*/
export const initializeLogger = async () => {
    logger = winston.createLogger({
        level: process.env.LOG_LEVEL ?? 'error',
        transports: [
            new winston.transports.Console({
                format: winston.format.cli()
            })
        ]
    });
    getLogger().info('📝 Logger configurado');
}

export const getLogger = (): Logger => {
    return logger;
}