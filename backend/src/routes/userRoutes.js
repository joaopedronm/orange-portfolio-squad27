const router = require("express").Router();
const userController = require("../controllers/userController")
const testeController = require("../controllers/testeController")

//const verifyToken = require("../util/check-token");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/auth/google', userController.googleLogin);
router.get('/auth/google/callback', userController.googleLoginCallback);
router.get("/checkuser", userController.checkUser);
router.get("/:id", userController.getUserById);
router.get("/teste", testeController.getTeste);
//router.patch("/edit/:id", verifyToken, userController.editUser);

module.exports = router;