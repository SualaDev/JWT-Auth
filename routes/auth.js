const router = require("express").Router()
const { check, validationResult } = require("express-validator")

router.post("/signup",[
  check("email","Please provide a valid email")
  .isEmail(),
  check("password", "Please put a password greater than 5 characters")
  .isLength({
    min: 6
  })
], (req,res) => {
  const { password, email} = req.body

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  console.log(password,email)
  res.send("Auth route working")
})


module.exports = router