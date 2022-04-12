import express from 'express'
import { addUser,getUsers,deleteUser,editUser,getUserById } from '../controller/use-controller.js'

const router = express.Router();

router.post('/add',addUser);
router.get('/',getUsers);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.put('/:id',editUser);

export default router