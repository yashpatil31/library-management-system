import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MaterialButton from '@mui/material/Button';
import styles from "./AdminDashboard.module.css"
import TablePagination from '@mui/material/TablePagination';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { Bookapi } from "../../BackendAPI/Book";

const DUMMY_DATA = [
    {
        "_id": "6453c9a2d225d86156a77c0f",
        "title": "Eloquent JavaScript, Third Edition",
        "imgurl": "../../img/book-img.jpg",
        "author": "Marijn Haverbeke",
        "available": "10",
        "quantity": "30",
        "price": "500"
    },
    {
        "_id": "9781491943533",
        "title": "Practical Modern JavaScript",
        "author": "Nicolás Bevacqua",
        "imgurl": "../../img/book-img.jpg",
        "available": "20",
        "quantity": "100",
        "price": "1000"
    },
    {
        "_id": "9781593277574",
        "title": "Understanding ECMAScript 6",
        "author": "Nicholas C. Zakas",
        "imgurl": "../../img/book-img.jpg",
        "available": "30",
        "quantity": "70",
        "price": "1500"
    }
]

const AdminDashboard = () => {
    const [books, setBooks] = useState(DUMMY_DATA);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [activeBook_id, setActiveBook_id] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const isAdmin = true;

    const fetchBooks = async () => {
        const { books } = await Bookapi.getAllBooks()
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

    // useEffect(() => {
    //     fetchBooks().catch(console.error)
    // }, [user])

    return (

            <div className={styles['dashboard']}>
                <div className={styles['dashboard-title']}>
                    <h3>Book List</h3>
                </div>
                {isAdmin && (
                    <div className={styles['add-book-conatiner']}>
                        <Link to={`/admin/books/add`}>
                            <MaterialButton variant="contained" style={{ backgroundColor: "#b18857" }} size="large" startIcon={<AddIcon />}>
                                Add Book
                            </MaterialButton>
                        </Link>
                    </div>
                )}
                {books.length > 0 ? (
                    <>
                        {
                            (rowsPerPage > 0 ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : books)
                                .map((book) => (
                                    <div className={styles["list-book-container"]} key={book._id}>
                                        <div className={styles["list-book-img-container"]}>
                                            <img src={book.imgurl}></img>
                                        </div>
                                        <div className={styles["list-book-details-container"]}>
                                            <h3>{book.title}</h3>
                                            <h2>{book.author}</h2>
                                            <p><span>Quantity: </span>{`${book.quantity}`}</p>
                                            <p><span>Price: </span>{` \u20A8 ${book.price}`}</p>
                                        </div>
                                        {isAdmin && (
                                            <div className={styles["list-buttons-container"]}>
                                                <div className={styles["btn-icon-container"]}>
                                                    <Link to={`/admin/books/${book._id}/edit`}>
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
                    </>) : (<p>No Books found</p>)}
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