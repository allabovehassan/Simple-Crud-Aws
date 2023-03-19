const express = require("express");
const app = express();
app.use(express.json());

const { sequelize } = require("./config/config");

const { userRouter } = require("./routes/userRouter");

app.use("/", userRouter);


app.listen(8080, async () => {
  try {
    await sequelize.sync();
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
});
