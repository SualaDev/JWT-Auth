const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const { users } = require("../db")

router.post("/signup",[
  check("email","Please provide a valid email")
  .isEmail(),
  check("password", "Please put a password greater than 5 characters")
  .isLength({
    min: 6
  })
], (req,res) => {
  const { password, email} = req.body
  // VALIDATE EMAIL
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  // VALIDATE IF EMAIL ALREADY EXISTS
  let user = users.find((user) => {
    return user.email === email
  })
  
  if(user){
    res.status(400).json({
      "errors": [
        {
          "msg": "Email already exists"
        }
      ]
    })
  }
  console.log(password,email)
  res.send("Validation Past")
})


module.exports = router