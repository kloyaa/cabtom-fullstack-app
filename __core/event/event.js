// const { EventType } = require("../../enum/event.enum")
const Event  = require("../../model/event.model");

const event = async (type, body = {}) => {
    return await new Event(body).save();
}

module.exports = { event }
