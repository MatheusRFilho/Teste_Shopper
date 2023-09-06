interface PacksInterface {
  product_id: number;
  pack_id: number;
  qty: number;
  id: number;
}

interface ProductsInterface {
  code: number;
  name: string;
  sales_price: number;
  cost_price: number;
}

interface CsvInterface {
  product_code: number;
  new_price: number;
}

export {
  PacksInterface,
  ProductsInterface,
  CsvInterface
} 