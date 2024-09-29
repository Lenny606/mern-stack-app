import {create} from "zustand";

export const useCategoryStore = create((set) => ({
    categories: [],
    setCategories: (categories) => set({categories}),
    createCategory: async (newCategory) => {
        if (!newCategory.name || !newCategory.description || !newCategory.images) {
            return {success: false, message: "Values are missing"}
        }

        const res = await fetch("/api/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        })

        const data = await res.json

        set((state) => ({
            categories: [...state.categories, data.data]
        }))
        return {success: true, message: "Values are saved"}
    },
    fetchCategories: async () => {
        const res = await fetch("api/categories")
        const data = await res.json()
        set({
            categories: data.data
        })
    },
    deleteCategory: async (id) => {
        const res = await fetch("api/categories/" + id, {
            method: "DELETE",
        })
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        }

        //updates UI immediately
        set((state) => ({
            categories: state.categories.filter(category => category._id === id)
        }))
        return {success: true, message: data.message}
    },
    updateCategory: async (id, updatedCategory) => {
        const res = await fetch("api/categories/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCategory)
        })
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        }

        set((state) => ({
            categories: state.categories.map(category => category._id === id ? data.data : category)
        }))
        return {success: true, message: "Values are saved"}
    },
    searchCategories: async function(name) {

        const res = await fetch("api/categories/search/" + name, )

        const data = await res.json()

        if (data.response && !data.response.count ) {
            return {success: false, data: data, message: "No categories found"}
        }
        return {success: true, data: data.response, count: data.response.count}
    },
}))