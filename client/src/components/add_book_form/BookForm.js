import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from "@mui/material"
import styles from "./BookForm.module.css"


export const BookForm = () => {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const [isInvalid, setIsInvalid] = useState(true)
    const [book, setBook] = useState({
        _id: "",
        name: "",
        author: "",
        category: "",
        description: "",
        // price: 0,
        // img: "",
        copies: "",
        shelf: "",
        floor: "",
    })
    const [errors, setErrors] = useState({
        _id: "",
        name: "",
        author: "",
        category: "",
        description: "",
        // img: "",
        // price: 0,
        shelf: "",
        floor: "",
        copies: "",
    })
        

    const fetchBook = async (url) => {
        const res = await fetch(url, { method: "GET" })
        const data = await res.json()
        return data
    }

    const patchBook = async (url,data) => {
        const res = await fetch(url, 
            { method: "PATCH" , 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const responsedata = await res.json()
        console.log(responsedata)
        return responsedata
    }

    const addBook = async (url, data) => {
        delete data['_id']
        console.log(data)
        const res = await fetch(url, { method: "POST" , 
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUxNGMxMTFlZGI3NjE2OTY5YzVkOTciLCJpYXQiOjE2ODMwNTAxMzIsImV4cCI6MTY4MzMwOTMzMn0.88xcMqfKV_yuS6pwGrH0H0Z79MsbeKC45tLcQpDyA8A"
        },
        body: JSON.stringify(data)
    })
        const responsedata = await res.json()
        console.log(responsedata)
        return responsedata
    }

    const formSubmit = (event) => {
        event.preventDefault()
        if (!isInvalid) {
            if (bookId) {
                const url = "http://localhost:5000/api/books/" + bookId
                patchBook(url, {
                        ...book,
                    })
                    .then(() => navigate(-1))
            } else {
                const url = "http://localhost:5000/api/books/"
                addBook(url,{
                        ...book,
                    })
                    .then(() => navigate("/"))
            }
        }
    }

    const updateBookField = (event) => {
        const field = event.target
        setBook((book) => ({ ...book, [field.name]: field.value }))
        setIsInvalid(() => {
            return(book.name.trim() === undefined ? true : false || book.category.trim() === "")
        })
    }

    const validateForm = (event) => {
        const { name, value } = event.target
        if (["name", "_id", "author", "description", "copies", "shelf", "floor"].includes(name)) {
            setBook((prevProd) => ({ ...prevProd, [name]: value.trim() }))
            if (!value.trim().length) {
                setErrors({ ...errors, [name]: `${name} can't be empty` })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
        if (["price", "copies", "shelf", "floor"].includes(name)) {
            if (isNaN(Number(value))) {
                setErrors({ ...errors, [name]: "Only numbers are allowed" })
            } else {
                if(Number(value) < 0)
                {
                    setErrors({ ...errors, [name]: "negative value not allowed" })
                }
                else
                {
                    setErrors({ ...errors, [name]: "" })
                }
            }
        }
    }

    useEffect(() => {
        if (bookId) {
            const url = "http://localhost:5000/api/books/" + bookId

            fetchBook(url).then(({ book, error }) => {
                if (error) {
                    navigate("/")
                } else {
                    setBook(book)
                }
            })
        }
    }, [bookId])

    return (
        <div className={styles["bookform-container"]}>
            <Container component={Paper} className={styles.wrapper}>
                <Typography className={styles.pageHeader} variant="h5">
                    {bookId ? "Update Book" : "Add Book"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                        {bookId && (
                            <FormControl className={`${styles.mb2},${styles['input-field']}`}>
                                <TextField
                                    label="Id"
                                    name="_id"
                                    required
                                    value={book._id}
                                    onChange={updateBookField}
                                    onBlur={validateForm}
                                    error={errors._id.length > 0}
                                    helperText={errors._id}
                                    disabled={true}
                                    sx={{"& .MuiOutlinedInput-root.Mui-disabled":{"& > fieldset": {border: '1px solid #c08c4d'}}}}
                                />
                            </FormControl>)
                        }
                        <FormControl className={styles.mb2}>
                            <TextField
                                label="Name"
                                name="name"
                                required
                                value={book.name}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.name.length > 0}
                                helperText={errors.name}
                                sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '1px solid #c08c4d'}}}}
                            />
                        </FormControl>
                        <FormControl className={styles.mb2}>
                            <TextField
                                label="Author"
                                name="author"
                                type="text"
                                value={book.author}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.author.length > 0}
                                helperText={errors.author}
                                sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '1px solid #c08c4d'}}}}
                            />
                        </FormControl>
                        <FormControl className={styles.mb2} sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '1px solid #c08c4d'}}}}>
                            <InputLabel>Category</InputLabel>
                            <Select name="category" value={book.category} onChange={updateBookField} required>
                                <MenuItem value="Romance">Romance</MenuItem>
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Computer Science">Computer Science</MenuItem>
                                <MenuItem value="Management">Management</MenuItem>
                                <MenuItem value="Electronics">Electronics</MenuItem>
                                <MenuItem value="Thriller">Thriller</MenuItem>
                                <MenuItem value="Physics">Physics</MenuItem>
                                <MenuItem value="Chemistry">Chemistry</MenuItem>
                                <MenuItem value="Mathematics">Mathematics</MenuItem>
                                <MenuItem value="Fiction">Fiction</MenuItem>
                                <MenuItem value="Philosophy">Philosophy</MenuItem>
                                <MenuItem value="Language">Language</MenuItem>
                                <MenuItem value="Arts">Arts</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={styles.mb2}>
                            <TextField
                                label="Description"
                                name="description"
                                type="text"
                                value={book.description}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.description.length > 0}
                                helperText={errors.description}
                                sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '1px solid #c08c4d'}}}}
                            />
                        </FormControl>
                        {/* <FormControl className={styles.mb2}>
                            <TextField
                                label="Price"
                                name="price"
                                required
                                value={book.price}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.price.length > 0}
                                helperText={errors.price}
                            />
                        </FormControl> */}
                        <FormControl className={styles.mb2}>
                            <TextField
                                label="Copies"
                                name="copies"
                                type="text"
                                value={book.copies}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.copies.length > 0}
                                helperText={errors.copies}
                                sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '1px solid #c08c4d'}}}}
                            />
                        </FormControl>
                        <FormControl className={styles.mb2}>
                            <TextField
                                label="Floor no"
                                name="floor"
                                type="text"
                                value={book.floor}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.floor.length > 0}
                                helperText={errors.floor}
                                sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '1px solid #c08c4d'}}}}
                            />
                        </FormControl>
                        <FormControl className={styles.mb2}>
                            <TextField
                                label="Shelf no"
                                name="shelf"
                                type="text"
                                value={book.shelf}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.shelf.length > 0}
                                helperText={errors.shelf}
                                sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '1px solid #c08c4d'}}}}
                            />
                        </FormControl>
                        {/* <FormControl className={styles.mb2}>
                            <TextField
                                label="Image url"
                                name="img"
                                type="text"
                                value={book.img}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                error={errors.img.length > 0}
                                helperText={errors.img}
                            />
                        </FormControl> */}
                    </FormGroup>
                    <div className={styles.btnContainer}>
                        <Button
                            variant="contained"
                            style={{backgroundColor:"#b18857"}}
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={isInvalid}>
                            {bookId ? "Update Book" : "Add Book"}
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}