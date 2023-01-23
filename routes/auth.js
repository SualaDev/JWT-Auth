const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const { users } = require("../db")
const bcrypt = require("bcrypt")

router.post("/signup",[
  check("email","Please provide a valid email")
  .isEmail(),
  check("password", "Please put a password greater than 5 characters")
  .isLength({
    min: 6
  })
], async (req,res) => {
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
   
  let hashedPassword = await bcrypt.hash(password, 10)
  users.push({
    email,
    password: hashedPassword
  })

  res.send("Validation Past")
})

router.get("/all", (req,res) => {
  return res.json(users)
})
module.exports = router