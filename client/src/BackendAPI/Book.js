const Bookapi = {

    getAllBooks: async (token) => {
        const res = await fetch("http://localhost:5000/api/books/", { 
            method: "GET" ,
            Authorization: `Bearer ${token}`
        })
        return res.json()
    },

    getBook: async (bookId) => {
        const res = await fetch(`http://localhost:5000/api/books/${bookId}`, { method: "GET" })
        const data = await res.json()
        return data
    },

    addBook : async (data) => {
        delete data['_id']
        const res = await fetch("http://localhost:5000/api/books/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUxNGMxMTFlZGI3NjE2OTY5YzVkOTciLCJpYXQiOjE2ODMwNTAxMzIsImV4cCI6MTY4MzMwOTMzMn0.88xcMqfKV_yuS6pwGrH0H0Z79MsbeKC45tLcQpDyA8A"
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    },

    patchBook : async (bookId,data) => {
        const res = await fetch(`http://localhost:5000/api/books/${bookId}`, 
            { method: "PATCH" , 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    },

    deleteBook: async (bookId) => {
        const res = await fetch(`http://localhost:5000/api/books/${bookId}`, { method: "DELETE" })
        return res.json()
    },

    fetchIssuedBooks: async() => {
        const res = await fetch("http://localhost:5000/api/issues/", { method: "GET" })
        return res.json()
    }
    
}

module.exports = { Bookapi }