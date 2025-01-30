import multer from "multer";
import path  from "path";


//configuracion del almacenamiento

const storage= multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})


// Filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'), false);
    }
  };
  
  // Set file size limit (optional)
  const limits = { fileSize: 5 * 1024 * 1024 }; // Max 5MB

//Inicializar multer
const upload= multer({storage,fileFilter,limits});

export default upload;