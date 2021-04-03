const { json } = require("express");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema;

const bugPostSchema = new schema({
  bugPostName: {
    type: String,
    required: true,
  },
  bugPostContent: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
  },
  importance: {
    type: String,
  },
  progress: {
    type: Number,
  },
  debuggerName: {
    type: String,
  },
  //   likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      userId: { type: Object, ref: "User" },
      userName: { type: Object, ref: "User" },
      userSurname: { type: Object, ref: "User" },
    },
  ],
  status: {
    type: String,
  },
});

module.exports = BugPost = mongoose.model("bugPost", bugPostSchema);
