require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
const useragent = require('express-useragent');
const { fileFilter, storage } = require("./__core/upload/multer.upload");

try {
    mongoose
      .set("strictQuery", false)
      .set("strictPopulate", false)
      .connect(process.env.CONNECTION_STRING)
      .then(() => console.log("SERVER IS CONNECTED"))
      .catch(() => console.log("SERVER CANNOT CONNECT"));

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ limit: '25mb', extended: true }));
    app.use(useragent.express());
    app.use(multer({ storage, fileFilter }).array("media"));

    app.use("/api", require("./controller/user.controller"));
    app.use("/api", require("./controller/profile.controller"));
    app.use("/api", require("./controller/product.controller"));
    app.use("/api", require("./controller/log.controller"));
    app.use("/api", require("./controller/message.controller"));
    app.use("/api", require("./controller/transaction.controller"));
    app.use("/api", require("./controller/notification-subscription.controller"));
    app.use("/api", require("./controller/upload.controller"));
    app.use("/api", require("./controller/sms.controller"));

    app.listen(port, () => console.log(`SERVER IS RUNNING ON ${port}`));
} catch (error) {
  console.log(error);
}
