import * as Validations from "./validation/index.js";
// the first one is the validate format that we will use for validating
// second is for telling the code to either validate on params or not 
export default function (validateFunc, params = false, query = false) {
  // validate func provided from routes will be used here 

  // checking if the validate func pass exist or not
  if (!Object.prototype.hasOwnProperty.call(Validations, validateFunc)) {
    return new Error(`'${validateFunc}' validateFunc is not exist`);
  }

  return async function (req, res, next) {
    try {
      let validated;
      // will validate param if exist else it will validate the body
      if (params) {
        validated = await Validations[validateFunc].validateAsync(req.params);
        req.params = validated;
      } else if (query) {
        // this will validate the query
        validated = await Validations[validateFunc].validateAsync(req.query);
        req.query = validated;
      } else {
        validated = await Validations[validateFunc].validateAsync(req.body);
        req.body = validated;

      }

      // after validation is successfull we move to the next step using the next() keyword
      next();
    } catch (err) {
      console.log('error', err.message)
      if (err.isJoi) return res.status(400).json({
        statusCode: 400,
        message: err.message
      })
      return res.status(400).json({
        statusCode: 400,
        message: 'Error while validating request'
      })
    }
  };
};
