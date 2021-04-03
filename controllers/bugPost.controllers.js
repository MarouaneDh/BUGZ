const BugPost = require("../models/BugPost");
const isAuth = require("../middlewares/isAuth");
const { Router } = require("express");

exports.postBugPost = async (req, res) => {
  try {
    bugPost = new BugPost(req.body);
    if (!req.body.bugPostName) {
      res.status(400).send({ message: "the bug post's name is required" });
      return;
    }
    if (!req.body.bugPostContent) {
      res.status(400).send({
        message: "you need to specify what your bug is in the centent field",
      });
      return;
    }
    bugPost.save().then(() => res.send({ message: "Post saved successfully" }));
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "not able to save bug post" });
  }
};

exports.getAllBugPosts = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const total = await BugPost.countDocuments();
    const result = await BugPost.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.send({
      page,
      total,
      limit,
      response: result,
      message: "got posts with success",
    });
  } catch (error) {
    res.status(400).send({ message: "can't get posts" });
  }
};

exports.getBugPost = async (req, res) => {
  try {
    const result = await BugPost.findOne({
      _id: req.params.id,
    });
    res.send({ response: result, message: "got bug post with success" });
  } catch (error) {
    res.status(400).send({ message: "there is no bug post with this id" });
  }
};

exports.deleteBugPost = async (req, res) => {
  try {
    const result = await BugPost.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ response: "Bug post was deleted" })
      : res.send("there is no bug post with this id");
    res.send("deleted");
  } catch (error) {
    res.send("Bug post wasn't deleted");
  }
};

exports.putBugPost = async (req, res) => {
  try {
    const result = await BugPost.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    console.log(result);
    result.nModified
      ? res.send({ message: "Bug post updated successfully" })
      : res.send({
          message: "the bug post has already been given this update",
        });
  } catch (error) {
    res
      .status(400)
      .send({ message: "there is no bug post with this id to be updated" });
  }
};

// exports.putLike = async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const result = await Recipe.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: { likes: req.user._id },
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).send({ response: result, message: "recipe liked" });
//   } catch (error) {
//     res.status(400).send({ message: "no like was given" });
//     console.log(error);
//   }
// };

// exports.putUnlike = async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const result = await Recipe.findByIdAndUpdate(
//       req.params.id,
//       {
//         $pull: { likes: req.user._id },
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).send({ response: result, message: "recipe unliked" });
//   } catch (error) {
//     res.status(400).send({ message: "no unlike was given" });
//     console.log(error);
//   }
// };

exports.postComment = async (req, res) => {
  const comment = {
    text: req.body.text,
    userId: req.user._id,
    userName: req.user.firstName,
    userSurname: req.user.lastName,
  };
  try {
    const result = await BugPost.updateOne(
      { _id: req.params.id },
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    ).populate("comments.userId", "User");
    res
      .status(200)
      .send({ response: result, message: "Bug post was commented" });
  } catch (error) {
    console.log(error);

    res.status(400).send({ message: "no comment was given to this bug post" });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    await BugPost.updateOne(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.params.comm_id } } }
    );

    res.status(200).send({ response: "comment was deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).send("comment wasn't deleted");
  }
};

exports.assignDebugger = async (req, res) => {
  const fixer = {
    fixerName: req.body.name,
  };
  console.log(fixer);
  try {
    const result = await BugPost.updateOne(
      { _id: req.params.id },
      {
        $push: { debuggers: fixer },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .send({ response: result, message: "Bug post was assigned" });
  } catch (error) {
    console.log(error);

    res.status(400).send({ message: "this bug post wasn't assigned" });
  }
};
exports.deleteDebugger = async (req, res) => {
  try {
    await BugPost.updateOne(
      { _id: req.params.id },
      { $pull: { debuggers: { _id: req.params.fixer_id } } }
    );

    res.status(200).send({ response: "fixer was deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).send("fixer wasn't deleted");
  }
};
