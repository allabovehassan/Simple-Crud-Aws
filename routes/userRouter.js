const { Users } = require("../models/userModel");
const userRouter = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  let data = await Users.findAll();
  res.send({message:"Server 2", data});
});

userRouter.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        console.log(err);
      } else {
        await Users.create({ email, password: hash });
        res.send("User Created");
      }
    });
  } catch (e) {
    console.log(e);
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  let data = await Users.findOne({ email });
  bcrypt.compare(password, data.password).then(function (result) {
    if (result) {
      var token = jwt.sign({ email: email }, "chaitu");
      res.send("Login Successful");
    } else {
      res.send("Wrong Password");
    }
  });
});

userRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const ID = req.params.id;

  try {
    const userData = await Users.update(payload, {
      where: { id: ID },
    });

    res.send({ message: "User updated" });
  } catch (error) {
    res.send({ message: "Error while updating" });
    console.log({ message: error.message });
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;

  await Users.destroy({
    where: { id: id },
  });

  res.send("User Deleted");
});

module.exports = { userRouter };
