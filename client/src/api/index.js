import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

export const signUp = (formData) => API.post('/user/signup', formData); 
export const verify = (id, token) => API.get(`/user/${id}/verify/${token}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const requestPasswordReset = (formData) => API.post('/user/password/reset', formData);
export const checkPasswordReset = (id, token) => API.get(`/user/${id}/password/reset/${token}`);
export const passwordReset = (id, formData) => API.post(`/user/${id}/password/reset`, formData);