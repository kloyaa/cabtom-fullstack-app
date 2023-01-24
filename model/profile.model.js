const mongoose = require("mongoose");
const { employeeShifts } = require("../const/employee-shifts.const");
const Schema = mongoose.Schema;

const options = {
    autoCreate: false,
    timestamps: true
};

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    role: {
        type: String,
        required: true,
        enum: ["owner", "staff", "driver", "farmer", "client"],
    },
    company: {
        type: String,
        required: true,
    },
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
        initial: {
            type: String,
        },
        full: {
            type: String,
            required: true,
        }
    },
    birthdate: {
        type: Date,
        required: true,
    },
    contact: {
        email: {
            type: String,
            required: true,

        },
        number: {
            type: String,
            required: true,
        }
    },
    address: {
        primary: {
            type: String,
            required: true,
        },
        permanent: {
            type: String,
            required: true,
        }
    },
}, options);

const DriverSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehiclePlateNumber: {
        type: String,
        required: true,
    },
}, options);

const StaffSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    position: {
        type: String,
        required: true,
    },
    shift: {
        type: String,
        required: true,
        enum: employeeShifts
    }
}, options);

module.exports = {
    Profile: mongoose.model("Profile", ProfileSchema),
    Driver: mongoose.model("Driver", DriverSchema),
    Staff: mongoose.model("Staff", StaffSchema)
}
