import { Router } from "express";
import { userModel } from '../models/user.model.js';

import isAdmin from '../middlewares/isAdmin.js';

const router = Router();

router.post('/login', isAdmin, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({email, password });

        if (!user){
            return res.status(500).json({message: 'User not found'})
        }

        user['password'] = undefined;
        req.session.user = user;

        res.status(200).redirect('/products')

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/register', async (req, res) => {
    const { firstName, email, age, password } = req.body;

    console.log(req.body)

    if(!firstName || !email || !age || !password){
        return res.status(400).json({message: 'Missing required fields'});
    }
    
    try {
        const user = await userModel.create({firstName, email, age, password})
        res.status(200).redirect('/login');
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

export default router;