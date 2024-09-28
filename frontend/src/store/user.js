import {create} from "zustand";
import {redirect} from "react-router-dom";
//TODO check responses
export const useUserStore = create((set) => ({
    users: [],
    isLogged: false,
    setUsers: (users) => set({users}),
    createUser: async (newUser) => {
        if (!newUser.name) {
            return {success: false, message: "Values are missing"}
        }

        const res = await fetch("api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })

        const data = await res.json()

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
    },
    registerUser: async (newUser) => {
        if (!newUser.email) {
            return {success: false, message: "Email is missing"}
        }
        const res = await fetch("api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        const data = await res.json()
        return {success: true, message: "User registered", data: data}
    },
    loginUser: async (user) => {
        if (!user.email) {
            return {success: false, message: "Email is missing"}
        }
        const res = await fetch("/api/auth/", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()
        set((state) => ({
            isLogged: true,
        }))
        return {success: true, message: "User login successful", data: data}
    },
    isLoggedIn: async (user) => {

        const res = await fetch("/api/auth/status", {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()
        if (data.success) {
            set((state) => ({
                isLogged: true,
            }))
            return {success: true, message: "User is logged", data: data}
        } else {
            return {success: false, message: "User not logged"}
        }
    },
    logout: async (user) => {
        if (!user.email) {
            return {success: false, message: "Email is missing"}
        }
        const res = await fetch("/api/auth/logout", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()
        set((state) => ({
            isLogged: true,
        }))
        console.log(data)
        return {success: true, message: "User logout successful", data: data}
    },
    getToken: function () {
        const expDataToken = localStorage.getItem("expiration")
        const expDate = new Date(expDataToken)
        const now = new Date()
        const duration = expDate.getTime() - now.getTime()
        if (duration < 0) {
            return "EXPIRED"
        }

        return localStorage.getItem("token")
    },
    getTokenExpiration: function () {
        const expDataToken = localStorage.getItem("expiration")
        const expDate = new Date(expDataToken)
        const now = new Date()
        const duration = expDate.getTime() - now.getTime()

        return duration
    },
    checkToken: () => {
        const token = this.getToken()
        console.log('token')
        if (!token) {
            redirect("/login")
        }
        return token ?? null
    },
    setLogoutState: (state) => set({isLogged: state})
}))