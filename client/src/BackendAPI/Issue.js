const Issueapi = {

    getAllIssues: async () => {
        const res = await fetch("http://localhost:5000/api/issues/", { method: "GET" })
        return res.json()
    },

    deleteAllIssues: async (bookId) => {
        const res = await fetch(`http://localhost:5000/api/issues/`, { method: "DELETE" })
        return res.json()
    },
    
}

module.exports = { Issueapi }