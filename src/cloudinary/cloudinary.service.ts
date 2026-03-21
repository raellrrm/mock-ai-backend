import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    uploadAudio(fileBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video', 
          folder: 'mockai_audios', 
        },
        (error, result) => {
          if (error) return reject(error);
          
          if (!result) return reject(new Error('O Cloudinary não retornou o resultado do upload.'));
          
          resolve(result.secure_url); 
        },
      );

      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }
}
