import AxiosInstance from "@/config/axiosInstance";

export const CategoryService = {
    getAll: async (url: string) => {
        return await AxiosInstance.get(url);
    },
    getById: async (id: string) => {
        return await AxiosInstance.get(`/categories/${id}`);
    }
}