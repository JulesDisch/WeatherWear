const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create)
  .post(usersController.logIn)

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.initial)
  .put(usersController.update)
  .delete(usersController.remove)
  .get(usersController.logOut);
  

module.exports = router;
