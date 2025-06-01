// morgan is use for logging the http request that comes into our application
import morgan from "morgan";

export const httpLogger = morgan(function (tokens, req, res) {
  // what we returned here will be our log format
  return [
    tokens.method(req, res), // Method like GET, POST, PUT, DELETE
    tokens.url(req, res),    // the url
    tokens.status(req, res),  // whatever status that is returned 200, 201, 404 
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})
