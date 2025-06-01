// winston is use for logging
import winston from "winston"

const logConfiguration = {
  transports: [new winston.transports.Console()],
  // defining the format of the log
  format: winston.format.combine(
    winston.format.label({
      label: "simple_rest_be",
    }),

    // addin a timestamp for every log
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.level}: [${info.label}] ${[info.timestamp]}: ${info.message}`
    )
  ),
};

// use the bove config to create a logger 
export const logger = winston.createLogger(logConfiguration);
