const JWT = require("jsonwebtoken")

module.exports= async (req, res, next) => {
  const token = req.header('x-auth-token')

  if(!token) {
    return res.status(400).json({
      "errors": [
        {
          "msg": "No Token Found"
        }
      ]
    })
  }

  try {
    let user = await JWT.verify(token,"ghfsjjhfhhdfjhdjhjdshuewiukdkk62874hffnm")
    req.email = user.email  
    next()
  } catch (error) {
    return res.status(400).json({
      "errors": [
        {
          "msg": "Token invalid"
        }
      ]
    })
  }
}