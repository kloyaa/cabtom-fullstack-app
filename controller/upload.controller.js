require("dotenv").config();
const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/auth.middleware");

const cloudinary = require("../__core/upload/cloudinary.upload");
const fs = require("fs");

router.post("/upload/img", jwtAuth, async (req, res) => {
    try {
        const urls = [];
        const files = req.files;
        const cloudOptions = {
            folder: `Projects/${process.env.CLOUDINARY_FOLDER}`,
            unique_filename: true,
        };

        if (files.length > 1) {
            for (const file of files) {
                const { path } = file;
                const upload = await cloudinary.uploader.upload(path, cloudOptions);
                urls.push(upload);
                fs.unlinkSync(path);
            }
            return res.status(200).send(urls);
        }
        else {
            for (const file of files) {
                const { path } = file;
                const upload = await cloudinary.uploader.upload(path, cloudOptions);
                urls.push(upload);
                fs.unlinkSync(path);
                break;
            }
            return res.status(200).json(urls[0]);
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
