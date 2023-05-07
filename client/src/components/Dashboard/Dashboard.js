import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MaterialButton from '@mui/material/Button';
import styles from "./Dashboard.module.css"
import TablePagination from '@mui/material/TablePagination';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { Bookapi } from "../../BackendAPI/Book";
import Navbar from "../Navbar/Navbar";


const DUMMY_BOOK = [{
    "_id":"9781593279509",
    "name":"Eloquent JavaScript, Third Edition",
    "image":{
        "url":"https://www.freepik.com/free-photo/book-composition-with-open-book_1320550.htm#query=book&position=1&from_view=keyword&track=sph"
    },
    "author":"Marijn Haverbeke",
    "published":"2018-12-04T00:00:00.000Z",
    "category":"Computer Technology",
    "quantity":15,
    "price":472,
    "description":"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "shelf":3,
    "floor":2
}]

const AdminDashboard = () => {
    const [books, setBooks] = useState(DUMMY_BOOK);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [activeBook_id, setActiveBook_id] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    const isAdmin = true;

    const fetchBooks = async (token) => {
        const { books } = await Bookapi.getAllBooks(token)
        console.log(books)
        setBooks(books)
    }

    const deleteBook = () => {
        if (activeBook_id && books.length) {
            Bookapi.deleteBook(activeBook_id).then(({ success }) => {
                console.log(success)
                fetchBooks().catch(console.error)
                setOpenModal(false)
                setActiveBook_id("")
            })
        }
    }

    useEffect(() => {
        if(!localStorage.getItem("token"))
        {
            navigate("/login")
        }
        else{
            const token = localStorage.getItem("token")
            console.log(token)
            fetchBooks(token).then((res)=> console.log(res)).catch(console.error)
        }
    },[navigate])

    return (
            <div className={styles['dashboard']}>
                <Navbar/>
                <div className={styles['dashboard-title']}>
                    <h3>Book List</h3>
                </div>
                {isAdmin && (
                    <div className={styles['add-book-conatiner']}>
                        <Link to={`/addbook`}>
                            <MaterialButton variant="contained" style={{ backgroundColor: "#b18857" }} size="large" startIcon={<AddIcon />}>
                                Add Book
                            </MaterialButton>
                        </Link>
                    </div>
                )}
                {books?.length > 0  ? ( 
                    <>
                        {
                            (rowsPerPage > 0 ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : books)
                                .map((book) => (
                                    <div className={styles["list-book-container"]} key={book._id}>
                                        <div className={styles["list-book-img-container"]}>
                                            <img src={book.image.url}></img>
                                        </div>
                                        <div className={styles["list-book-details-container"]}>
                                            <h3>{book.name}</h3>
                                            <h2>{book.author}</h2>
                                            <p><span>Quantity : </span>{`${book.quantity}`}</p>
                                            <p><span>Category : </span>{`${book.category}`}</p>
                                            <p><span>Price : </span>{` \u20A8 ${book.price}`}</p>
                                        </div>
                                        {isAdmin && (
                                            <div className={styles["list-buttons-container"]}>
                                                <div className={styles["btn-icon-container"]}>
                                                    <Link to={`/editbook/${book._id}`}>
                                                        <IconButton aria-label="edit" className={styles["btn-icon"]} size="large" style={{ color: "#FFF" }}>
                                                            <EditIcon fontSize="large" />
                                                        </IconButton>
                                                    </Link>
                                                </div>

                                                <div className={styles["btn-icon-container"]} color="rgb(252, 236, 215)">
                                                    <IconButton aria-label="delete" onClick={(e) => {
                                                        setActiveBook_id(book._id)
                                                        setOpenModal(true)
                                                    }} className={styles["btn-icon"]} style={{ color: "#FFF" }} size="large">
                                                        <DeleteIcon fontSize="large" />
                                                    </IconButton>
                                                </div>
                                            </div>)
                                        }
                                    </div>
                                ))
                        }
                    </>) : (<h2 className="nobooks-errormsg">No Books found</h2>)}
                <TablePagination
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10))
                        setPage(0)
                    }}
                    component="div"
                    count={books.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                />
                <Modal show={openModal} onHide={(e) => setOpenModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">Are you Sure ?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteBook}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
    )
}

export default AdminDashboard;