import {GET, POST} from "@/services/apiServices";

export const login = async (username, password) => {
    return await POST('/login', {
        username,
        password,
    })
}

export const register = async (name, username, email, password, code) => {
    return await POST('/sign-up',{
        name,
        username,
        email,
        password,
        code
    })
}

export const logout = async () => {
    return await POST('/logout')
}

export const sentEmail = async (email) => {
    return await POST('/via-email',email)
}