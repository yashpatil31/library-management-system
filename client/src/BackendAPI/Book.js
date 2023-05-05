const Bookapi ={

    getAllBooks: async () => {
        const res = await fetch("http://localhost:5000/api/books/", { method: "GET" })
        return res.json()
    },

    deleteBook : async (bookId) => {
        const res = await fetch(`http://localhost:5000/api/books/${bookId}`, { method: "DELETE" })
        return res.json()
    }
}

module.exports = { Bookapi }