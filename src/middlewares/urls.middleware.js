import schemaUrls from "../schemas/urls.schema.js"

async function ValidaSchemaUrls(req, res, next) {
    const { url } = req.body
  
      const validation = schemaUrls.validate({ url });
  
    if (validation.error) {
      return res.sendStatus(422);
    }
    next()
  }

  export { ValidaSchemaUrls }