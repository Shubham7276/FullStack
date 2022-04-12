const express = require("express");
const router = express.Router();

const {
    pm,
    user,
    admin,
} = require("../controllers/test");

router.get("/pm", pm);
router.get("/user", user);
router.get("/admin", admin);

module.exports = router;
