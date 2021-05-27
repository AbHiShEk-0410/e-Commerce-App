const express = require('express');
const app = express();
const { productRoute } = require("./routes/products")
const { userRoute } = require("./routes/user")
const { loginRoute } = require("./routes/login")
const { signupRoute } = require("./routes/signup")


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/login", loginRoute)
app.use("/signup", signupRoute)
app.listen(3000, () => {
  console.log('server started');
});