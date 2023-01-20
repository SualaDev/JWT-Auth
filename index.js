const express = require("express")
const app = express()
const auth = require("./routes/auth")
app.use(express.json())

app.use("/auth", auth)
app.get("/", (req,res) => {
  res.send("Hi, I am working!")
})

app.listen(5000, () => {
  console.log("Now running on Port 5000")
})