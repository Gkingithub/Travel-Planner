import api from "./api";
export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    console.log(response.data);

    localStorage.setItem(
        "token",
        response.data.data.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
    );

    return response.data;
};
export const register = async (fullName, email, password) => {
    const response = await api.post("/auth/register", {
        fullName,
        email,
        password

    });

    return response.data;
};
export const loginAdmin = async (email, password) => {
    const response = await api.post('/auth/loginAdmin', { email, password });
    return response.data;
};
export const logout = () => {
    localStorage.removeItem('token');
};