import { Router } from 'express';
import { CsvReaderController } from './controllers/CsvReaderController';
import { UploadMiddleware } from './middleware/Upload';
import { ProductController } from './controllers/ProductsController';
import { PacksController } from './controllers/PacksController';
const Routes = Router();

const csvReader = new CsvReaderController();
const productController = new ProductController();
const packsController = new PacksController();

Routes.post('/validate', UploadMiddleware.single('file'), csvReader.validate);


Routes.get('/products', productController.getAll);
Routes.get('/packs', packsController.getAll);

Routes.get('/packs/:id', packsController.getInfoByPackId);



export { Routes };