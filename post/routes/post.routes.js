const express = require("express");
const { createPost, bulkInsert } = require("../controllers/post.controller");

const router = express.Router()

router.route("/get-post").get(createPost)
router.route("/bulk-insert").post(bulkInsert)

module.exports = router