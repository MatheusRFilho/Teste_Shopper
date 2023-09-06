import { Request, Response } from 'express';

import { db } from '../database';

class ProductController {
  async getAll(req: Request, res: Response) {
    const queryString = `SELECT * FROM products;`;
    db.query(queryString, (err, result) => {
      return res.status(400).json(result);
    });
  }
}

export { ProductController };
