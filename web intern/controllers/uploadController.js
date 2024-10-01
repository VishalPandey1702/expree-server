// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const path = require('path');
// const Image = require('../models/imageModel');
// const fs = require('fs');

// const s3 = new S3Client({
//     region: 'ap-southeast-2',
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

// const uploadFile = async (req, res) => {
//     try {
//         const file = req.file;
//         const fileContent = fs.readFileSync(file.path);
//         const fileName = path.basename(file.path);

//         const params = {
//             Bucket: 'omnipractice-vishal',
//             Key: fileName,
//             Body: fileContent,
//         };

//         const command = new PutObjectCommand(params);
//         await s3.send(command);

//         const url = `https://${params.Bucket}.s3.amazonaws.com/${fileName}`;

//         const image = new Image({
//             key: fileName,
//             url: url,
//             uploadedAt: new Date()
//         });

//         await image.save();
//         res.json({ message: 'File uploaded successfully', url });
//     } catch (err) {
//         res.status(500).json({ error: 'Error uploading file' });
//     }
// };

// module.exports = { uploadFile };


const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');
const Image = require('../models/imageModel');


const s3 = new S3Client({
    region: 'ap-southeast-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadFile = async (req, res) => {
    try {
        console.log('Upload controller hit'); // Add this for debugging

        // Check if a file is provided in the request
        if (!req.file) {
            console.log('No file found in request'); // Add this for debugging
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('File received:', req.file); // Log the received file for debugging

        const file = req.file;
        const filePath = file.path;
        const fileName = file.originalname;

        console.log('File path:', filePath);  // Log file path
        console.log('File name:', fileName);  // Log file name

        // Read the file from the file system
        const fileContent = fs.readFileSync(filePath);

        // Configure S3 upload parameters
        const params = {
            Bucket: 'omnipractice-vishal', 
            Key: fileName,  
            Body: fileContent  
        };

        console.log('Uploading file to S3'); // Log before S3 upload

        // Create an S3 PutObjectCommand and upload the file
        const command = new PutObjectCommand(params);
        await s3.send(command);

        console.log('File uploaded to S3'); // Log after S3 upload

        // Generate the URL of the uploaded file
        const url = `https://${params.Bucket}.s3.amazonaws.com/${fileName}`;

        console.log('Saving file metadata to MongoDB'); // Log before saving to MongoDB

        // Save the file metadata to MongoDB
        const image = new Image({
            key: fileName,
            url: url,
            uploadedAt: new Date()
        });

        await image.save();  // Save to MongoDB

        console.log('File metadata saved to MongoDB'); // Log after saving to MongoDB

        // Send success response
        return res.status(200).json({
            message: 'File uploaded successfully',
            url: url
        });
    } catch (err) {
        console.error('Error during file upload:', err);  // Log the error
        return res.status(500).json({ message: 'Error uploading file', error: err.message });
    }
};

module.exports = { uploadFile };