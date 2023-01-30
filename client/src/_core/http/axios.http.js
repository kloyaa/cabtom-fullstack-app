import axios from "axios";

export const HttpMethods = {
    POST: "post",
    GET: "get",
    PATCH: "patch "
}

export const HttpStatu = {
    POST: "post",
    GET: "get",
    PATCH: "patch "
}

export const axiosHttp = async ({ url, method, headers, payload, onErrorPaths }) => {
    let options = {
        method,
        url: `http://localhost:5000/api${url}`,
        headers,
    };
    if (method === HttpMethods.POST) options.data = payload;
    else if (method === HttpMethods.GET) options.params = payload;
    try {
        return await axios(options);
    } catch (err) {
        if (err.response?.status === 401) return window
            .location
            .replace(onErrorPaths.UnauthorizedException);
        throw err;
    }
}
