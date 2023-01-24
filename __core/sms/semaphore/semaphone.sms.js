const axios = require("axios");

const baseUrl = process.env.SEMAPHORE_URL;
const apiVersion = process.env.SEMAPHORE_VERSION;

async function send({ apikey, number, sendername, message }) {
    return await axios.post(`${baseUrl}/${apiVersion}/messages`, {
        apikey, number, sendername, message
    })
}

async function sendBulk({ apikey, number, sendername, message }) {
    const numArray = number.join(", ");
    return await axios.post(`${baseUrl}/${apiVersion}/messages`, {
        apikey, number: numArray, sendername, message
    })
}

async function sendPriority({ apikey, number, sendername, message }) {
    return await axios.post(`${baseUrl}/${apiVersion}/priority`, {
        apikey, number, sendername, message
    })
}

async function sendOtp({ apikey, number, sendername, message }) {
    return await axios.post(`${baseUrl}/${apiVersion}/otp`, {
        apikey, number, sendername, message
    })
}

async function messages({ apikey, limit, page, startDate, endDate}) {
    return await axios.get(`${baseUrl}/${apiVersion}/messages`, {
        params: { apikey, limit, page, startDate, endDate }
    })
}

async function account({ apikey }) {
    return await axios.get(`${baseUrl}/${apiVersion}/account`, {
        params: { apikey }
    })
}

async function transactions({ apikey, limit, page }) {
    return await axios.get(`${baseUrl}/${apiVersion}/account/transactions`, {
        params: { apikey, limit, page }
    })
}

async function senderNames({ apikey, limit, page }) {
    return await axios.get(`${baseUrl}/${apiVersion}/account/sendernames`, {
        params: { apikey, limit, page }
    })
}

async function users({ apikey, limit, page }) {
    return await axios.get(`${baseUrl}/${apiVersion}/account/users`, {
        params: { apikey, limit, page }
    })
}

module.exports = {
    messages,
    account,
    transactions,
    senderNames,
    users,
    send,
    sendBulk,
    sendPriority,
    sendOtp
}
