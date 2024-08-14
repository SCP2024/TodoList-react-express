import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model";
import { SECRET_KEY } from "../constant";

var router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = await User.findOne({
        name,
        password,
    });
    if (user) {
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({ data: user, success: true , token});
    } else {
        return res.status(500).json({ message: "用户名或密码错误" });
    }
});

export default router;