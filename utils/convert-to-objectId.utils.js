const mongoose = require("mongoose");

module.exports = {
    convertToObjectId: (string) => {
        if(!mongoose.Types.ObjectId.isValid(string))
            throw "Invalid ObjectId";

        return  mongoose.Types.ObjectId(string);
    }
}
