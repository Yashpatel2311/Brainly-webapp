const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://theyashpatel2311:Yash.2311@cluster0.taqoa.mongodb.net/brainly-database"
);
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";
import express from "express";
import { Contentmodel, Linkmodel, Usermodel } from "./db";
import { usermiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});
app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Usermodel.create({
    username: username,
    password: password,
  });

  res.status(200).json({
    message: "user signed up!",
  });
});
app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await Usermodel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(403).json({ message: "user is not sign up!" });
  }
});
app.post("/api/v1/content", usermiddleware, async (req, res) => {
  const { link, type, title } = req.body;
  // Create a new content entry linked to the logged-in user.
  await Contentmodel.create({
    link,
    type,
    title,
    //@ts-ignore
    userId: req.userId, // userId is added by the middleware.
    tags: [], // Initialize tags as an empty array.
  });

  res.json({ message: "Content added" }); // Send success response.
});

app.get("/api/v1/content", usermiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId; // User ID is fetched from middleware
  // Fetch all content associated with the user ID and populate username
  // The `populate` function is used to include additional details from the referenced `userId`.
  // For example, it will fetch the username linked to the userId.
  // Since we specified "username", only the username will be included in the result,
  // and other details like password won’t be fetched.
  const content = await Contentmodel.find({ userId: userId }).populate(
    "userId",
    "username"
  );
  res.json({ content }); // Send the content as response
});
app.delete("/api/v1/content", usermiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await Contentmodel.deleteMany({
    contentId: contentId,
    //@ts-ignore
    userId: req.userId,
  });
  res.json({
    message: "deleted",
  });
});
app.post("/api/v1/brain/share", usermiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existinglink = await Linkmodel.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existinglink) {
      res.json({
        hash: existinglink.hash,
      });
      return;
    }
    const hash = random(10);
    await Linkmodel.create({
      //@ts-ignore
      userId: req.userId,
      hash: hash,
    });
    res.json({
      hash,
    });
  } else {
    await Linkmodel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });
    res.json({
      message: "Removed Link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await Linkmodel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input",
    });
    return;
  }
  //userId
  const content = await Contentmodel.find({
    userId: link.userId,
  });
  const user = await Usermodel.findOne({
    _id: link.userId,
  });
  if (!user) {
    res.status(411).json({
      message: "user not found",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(3000);
