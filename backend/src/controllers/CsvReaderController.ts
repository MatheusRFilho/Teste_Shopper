import { Request, Response } from 'express';
import fs from 'fs';
import csvParser from 'csv-parser';

import { CsvInterface, ProductsInterface } from '../model/interfaces';

import { db } from '../database';

class CsvReaderController {
  async validate(req: Request, res: Response) {
    const products = [];
    const dataInvalid = [];
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }
    const data: CsvInterface[] = await new Promise((resolve, reject) => {
      const parsedData = [];
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (row) => {
          parsedData.push(row);
        })
        .on('end', () => {
          resolve(parsedData as CsvInterface[]);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
    try {
      const productPromises = data.map(async (item) => {
        const productId = item.product_code;
        const newPrice = item.new_price;

        const queryString = `SELECT * FROM products WHERE code=${productId};`;
        return new Promise<{ product: ProductsInterface, newPrice: number }>((resolve, reject) => {
          db.query(queryString, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({ product: result[0], newPrice });
            }
          });
        });
      });
      const productResults = await Promise.all(productPromises);
      productResults.forEach(({ product, newPrice }) => {
        const percentualAllowed = product.sales_price * (10 / 100);
        if (product.cost_price > newPrice) {
          dataInvalid.push(`O novo preço do produto ${product.code} é menor que o preço de custo!`); 
        } else {
          if (newPrice > product.sales_price) {
            if (newPrice - product.sales_price >= percentualAllowed) {
              dataInvalid.push(`A alteração do produto ${product.code} foi maior que 10% do valor atual`);
            }
          } else {
            if (product.sales_price - newPrice >= percentualAllowed) {
              dataInvalid.push(`A alteração do produto ${product.code} foi menor que 10% do valor atual`); 
            }
          }
        }
        products.push(product);
      });
      if (dataInvalid.length > 0) {
        return res.status(400).json(dataInvalid);
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }
  }
}

export { CsvReaderController };
