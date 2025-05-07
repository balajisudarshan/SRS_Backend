const {Router } = require('express');

const userController = require('./userController.js');
const router = Router();

router.post('/register',userController.addUser);

router.get('/',userController.getAllUsers);
router.get('/:id',userController.getSingleUser);
router.delete('/:id',userController.deleteUser);
router.post('/login',userController.login);
module.exports = router;