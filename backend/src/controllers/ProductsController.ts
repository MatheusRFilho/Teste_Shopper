import { Request, Response } from 'express';
import { db } from '../database';

class ProductController {
  async getAll(req: Request, res: Response) {
    const queryString = `SELECT * FROM products;`;
    db.query(queryString, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar os produtos.' });
      }
      return res.status(200).json(result);
    });
  }

  async update(req: Request, res: Response) {
    try {
      const dataToUpdate = req.body;

      for (const item of dataToUpdate) {
        const { code, name, cost_price, new_price } = item;

        const queryString = `
          UPDATE products
          SET name = ?,
              cost_price = ?,
              sales_price = ?
          WHERE code = ?;
        `;

        db.query(queryString, [name, cost_price, new_price, code], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar os campos no banco de dados.' });
          }
        });
      }

      return res.status(200).json({ success: true, message: 'Campos atualizados com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro no servidor.' });
    }
  }
}

export { ProductController };
