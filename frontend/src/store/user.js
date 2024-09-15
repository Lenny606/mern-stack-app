import {create} from "zustand";

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({users}),
    createUser: async (newUser) => {
        if (!newUser.name ) {
            return {success: false, message: "Values are missing"}
        }

        const res = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })

        const data = await res.json

        set((state) => ({
            users: [...state.users, data.data]
        }))
        return {success: true, message: "Values are saved"}
    },
    fetchUsers: async () => {
        const res = await fetch("api/users")
        const data = await res.json()
        set({
            users: data.data
        })
    },
    deleteUser: async (id) => {
        const res = await fetch("api/users/" + id, {
            method: "DELETE",
        })
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        }

        //updates UI immediately
        set((state) => ({
            users: state.users.filter(user => user._id === id)
        }))
        return {success: true, message: data.message}
    },
    updateUser: async (id, updatedUser) => {
        const res = await fetch("api/users/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        }

        set((state) => ({
            users: state.users.map(user => user._id === id ? data.data : user)
        }))
        return {success: true, message: "Values are saved"}
    }
}))