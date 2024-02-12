import cloudinary from 'cloudinary';

cloudinary.v2.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.API_KEY,
 api_secret: process.env.API_SECRET,
});

export const uploadPicture = async (file: string, folderName: string, fileName:string) => {
    const { url, public_id } = await cloudinary.v2.uploader.upload(file, {
        public_id: `${fileName}`,
        folder: `las/${folderName}/`,
    });
    return { url, public_id };
}