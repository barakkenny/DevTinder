const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password }  = req.body

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash)
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post('/login', async (req, res) => {
  try{
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId})
    if(!user){
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(isPasswordValid){
      res.send("Login successful!!!");
    }else{
      throw new Error("Invalid credentials");
    }

  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
})

app.get("/user", async (req, res) => {
  try {
    const getUser = await User.find({ emailId: req.body.emailId });
    if (getUser.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(getUser);
    }
    res.send(getUser);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const getUser = await User.find({});
    res.send(getUser);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const user = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(user).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const updateUser = await User.findByIdAndUpdate({ _id: userId }, user, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully", updateUser);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const deleteUser = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully", deleteUser);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("listening at port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
