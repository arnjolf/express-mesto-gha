const router = require('express').Router();

const {
  createUser,
  getAllUsers,
  updateUser,
  updateUserAvatar,
  getUserById,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
