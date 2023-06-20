const router = require('express').Router();
const {
  getByIdValidate,
  updateUserValidate,
  updateUserAvatarValidate,
} = require('../middlewares/validator');

const {
  getAllUsers,
  updateUser,
  updateUserAvatar,
  getUserById,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getByIdValidate, getUserById);
router.patch('/me', updateUserValidate, updateUser);
router.patch('/me/avatar', updateUserAvatarValidate, updateUserAvatar);
router.get('/me', getUserInfo);

module.exports = router;
