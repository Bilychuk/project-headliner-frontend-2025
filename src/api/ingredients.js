import { api } from "./api.js";


export const getAllIngredientsAPI = async () => {
    const response = await api.get('api/ingredients');
    return response.data;
};