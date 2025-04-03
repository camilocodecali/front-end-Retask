import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmEmail, dashboardUserSchema, UserLoginForm, UserRegistrationForm, userSchema } from "../types";

export async function createAccount(formData:UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw  new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmEmail) {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw  new Error(error.response.data.error)
        }
    }
}

export async function authenticateUser(formData:UserLoginForm) {
    try {
        const url= '/auth/login'
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw  new Error(error.response.data.error)
        }
    }
    
    
}

export async function getUser() {
    try {
        const {data} = await api('/auth/user')
        const response = userSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw  new Error(error.response.data.error)
        }
    }
}

export async function getUsers() {
    try {
        const {data} = await api('/auth/')
        const response = dashboardUserSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}