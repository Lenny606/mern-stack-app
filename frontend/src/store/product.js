import {create} from "zustand";
import {useUserStore} from "./user.js";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Values are missing"}
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })

        const data = await res.json

        set((state) => ({
            products: [...state.products, data.data]
        }))
        return {success: true, message: "Values are saved"}
    },
    fetchProducts: async function() {
        const { getToken } = useUserStore.getState();
        const res = await fetch("api/products", {
            headers: {
                'Authorization': "Bearer " + getToken()
            }
        })

        const data = await res.json()
        set({
            products: data.data
        })
    },
    deleteProduct: async (id) => {
        const res = await fetch("api/products/" + id, {
            method: "DELETE",
        })
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        }

        //updates UI immediately
        set((state) => ({
            products: state.products.filter(product => product._id === id)
        }))
        return {success: true, message: data.message}
    },
    updateProduct: async (id, updatedProduct) => {
        const res = await fetch("api/products/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        }

        set((state) => ({
            products: state.products.map(product => product._id === id ? data.data : product)
        }))
        return {success: true, message: "Values are saved"}
    },
    searchProducts: async function(name) {

        const res = await fetch("api/products/search/" + name, )

        const data = await res.json()
        console.log(data)
        if (!data.success) {
            return {success: false, message: data.message}
        }
        return {success: true, data: data, count: data.count}
    },
}))