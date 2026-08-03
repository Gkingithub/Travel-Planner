import api from "./api";


export const login = async (email, password) => {

    const response = await api.post("/auth/login", {
        email,
        password,
    });


    localStorage.setItem(
        "token",
        response.data.data.token
    );


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
            ...response.data.data.user,
            role:"User"
        })
    );


    return response.data;
};



export const loginAdmin = async (email, password) => {

    const response = await api.post(
        "/auth/loginAdmin",
        {
            email,
            password
        }
    );


    localStorage.setItem(
        "token",
        response.data.data.token
    );


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
            ...response.data.data.user,
            role:"Admin"
        })
    );


    return response.data;
};



export const register = async (
    fullName,
    email,
    phoneNumber,
    password
) => {

    const response = await api.post(
        "/auth/register",
        {
            fullName,
            email,
            phoneNumber,
            password
        }
    );


    return response.data;
};



export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

};