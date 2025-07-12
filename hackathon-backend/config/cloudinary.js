import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUDINARY_KEY,CLOUDINARY_NAME,CLOUDINARY_SECRET } from './env.js';


cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

console.log('Cloudinary config:', cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rewear_items',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

export { cloudinary, storage };
