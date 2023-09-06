import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, 'csv_file.csv');
  },
});

const UploadMiddleware = multer({ storage });


export {UploadMiddleware};