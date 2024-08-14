import express, { Request, Response, NextFunction } from "express";
import { TodoList } from "../model";

const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    const todelistModel = new TodoList(req.body);
    console.log(
      '%c [ todelistModel ]-5',
      'font-size:13px; background:pink; color:#bf2c9f;',
      todelistModel)
    const todolist = await todelistModel.save();
  
    return res.status(200).json({ message: '创建成功' });
  });
  
router.get('/', async (req: Request, res: Response) => {
    const { current = 1, pageSize = 10, todo, status} = req.query;
    // 查询总数
      const total = await TodoList.countDocuments({
        ...(todo && { todo }),
        ...(status && { status }),
    });
      console.log(
          '%c [ total ]-17',
          'font-size:13px; background:pink; color:#bf2c9f;',
          total
      );
  
    // 分页查询
    const data = await TodoList.find({
    ...(todo && { todo }),
    ...(status && { status }),
    })
      .sort({ updatedAt: -1 })
      .skip((Number(current) - 1) * Number(pageSize))
      .limit(Number(pageSize));
  
    return res.status(200).json({ data, total });
  });
  
  router.get('/:id', async (req: Request, res: Response) => {
    const book = await TodoList.findOne({ _id: req.params.id });
    if (book) {
      res.status(200).json({ data: book, success: true });
    } else {
      res.status(500).json({ message: '该事项不存在' });
    }
  });
  
  // 更新
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      await TodoList.findOneAndUpdate({ _id: req.params.id }, req.body);
  
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
  
  router.delete('/:id', async (req: Request, res: Response) => {
    const book = await TodoList.findById(req.params.id);
    if (book) {
      await TodoList.deleteOne({ _id: req.params.id });
  
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ message: '该事项不存在' });
    }
  });

export default router; 
