const express = require("express");
const router = express.Router();
const BugPost = require("../models/BugPost");
const controllers = require("../controllers/bugPost.controllers");
const isAuth = require("../middlewares/isAuth");
// test routing
router.get("/hellobug posts", (req, res) => {
  res.send("routing bug posts OK");
});

//post bugPost
//get all bug posts
//get bugPost by id
//delete bugPost
//update bugPost

//POST
//bugPost posting
//PATH: http://localhost:8080/api/bugPost/
//params Body
router.post("/", controllers.postBugPost);

//GET
//getting all bug posts
//PATH: http://localhost:8080/api/bugPost/
router.get("/", controllers.getAllBugPosts);

//GET
//getting bugPost by id
//PATH: http://localhost:8080/api/bugPost/:id
//params id
router.get("/:id", controllers.getBugPost);

//DELETE
//deleting a bugPost by id
//PATH: http://localhost:8080/api/bugPost/:id
//params id
router.delete("/:id", controllers.deleteBugPost);

//PUT
//updating a bugPost by id
//PATH: http://localhost:8080/api/bugPost/:id
//params id body
router.put("/:id", controllers.putBugPost);

//PUT
//liking a bugPost by id
//PATH: http://localhost:8080/api/bugPost/like/:id
//params id body
// router.put("/like/:id", isAuth, controllers.putLike);

//PUT
//unliking a bugPost by id
//PATH: http://localhost:8080/api/bugPost/unlike/:id
//params id body
// router.put("/unlike/:id", isAuth, controllers.putUnlike);

//POST
//commenting a bugPost by id
//PATH: http://localhost:8080/api/bugPost/comment/:id
//params id body
router.post("/comment/:id", isAuth, controllers.postComment);
router.delete("/comment/:id/:comm_id", isAuth, controllers.deleteComment);

//POST
//assigning a bugPost to a debugger by id
//PATH: http://localhost:8080/api/bugPost/assign/:id
//params id body
router.post("/assign/:id", isAuth, controllers.assignDebugger);
router.delete("/assign/:id/:fixer_id", isAuth, controllers.deleteDebugger);

module.exports = router;
