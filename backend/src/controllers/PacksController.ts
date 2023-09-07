import { Request, Response } from 'express';

import { db } from '../database';
import { PacksInterface, ProductsInterface } from '../model/interfaces';

class PacksController {
  async getAll(req: Request, res: Response) {
    const queryString = `SELECT pack_id, SUM(qty) as total_qty
    FROM packs
    GROUP BY pack_id;`;
    db.query(queryString, (err, result) => {
      return res.status(200).json(result);
    });
  }
  async getInfoByPackId(req: Request, res: Response) {
    const { id } = req.params;
    const queryString = `SELECT * FROM packs WHERE pack_id = ${id};`;
    try {
      const result: PacksInterface[] = await new Promise((resolve, reject) => {
        db.query(queryString, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result as PacksInterface[]);
          }
        });
      });
      let packTotal = 0;
      const products = [];
      await Promise.all(
        result.map(async (e: PacksInterface) => {
          const [productData]: ProductsInterface[] = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products WHERE code = ${e.product_id}`, (err, data) => {
              if (err) {
                reject(err);
              } else {
                products.push({...data[0], qty: e.qty})
                resolve(data as ProductsInterface[]);
              }
            });
          });
          packTotal += productData.sales_price * e.qty;
        })
      );
      return res.status(200).json({ total: packTotal, products });
    } catch (error) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }
  }
}

export { PacksController };
