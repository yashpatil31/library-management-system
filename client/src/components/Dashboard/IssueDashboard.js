import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialButton from '@mui/material/Button';
import styles from "./Dashboard.module.css"
import TablePagination from '@mui/material/TablePagination';
import 'bootstrap/dist/css/bootstrap.css';
import { Issueapi } from "../../BackendAPI/Issue";
import Navbar from "../Navbar/Navbar";

const DUMMY_BOOK = [{
    "_id": "9781593279509",
    "name": "Eloquent JavaScript, Third Edition",
    "image": {
        "url": "https://www.freepik.com/free-photo/book-composition-with-open-book_1320550.htm#query=book&position=1&from_view=keyword&track=sph"
    },
    "author": "Marijn Haverbeke",
    "published": "2018-12-04T00:00:00.000Z",
    "category": "Computer Technology",
    "quantity": 15,
    "price": 472,
    "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "shelf": 3,
    "floor": 2,
    "returned": false
}]


const IssueDashboard = () => {
    const [books, setBooks] = useState(DUMMY_BOOK);
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const isAdmin = true;

    // useEffect(() => {
    //     const fetchIssuedBooks = async () => {
    //         const { resbooks } = await Issueapi.getAllIssues()
    //         console.log(resbooks)
    //         setBooks(resbooks)
    //     }
    //     fetchIssuedBooks()
    // },[])

    return (
        <div className={styles['dashboard']}>
            <Navbar/>
            <div className={styles['dashboard-title']}>
                <h3>Issued Book List</h3>
            </div>
            {isAdmin && (
                <div className={styles['add-book-conatiner']}>
                        <MaterialButton variant="contained" style={{ backgroundColor: "#b18857" }} size="large" startIcon={<DeleteIcon />}>
                            Delete All Issues
                        </MaterialButton>
                </div>
            )}
            {books.length > 0 ? (
                <>
                    {
                        (rowsPerPage > 0 ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : books)
                            .map((book) => (
                                !book.returned &&
                                <div className={styles["list-book-container"]} key={book._id}>
                                    <div className={styles["list-book-img-container"]}>
                                        <img src={book.image.url}></img>
                                    </div>
                                    <div className={styles["list-book-details-container"]}>
                                        <p className={styles["book-name"]}>{book.name}</p>
                                        <p className={styles["book-author"]}>{book.author}</p>
                                        <p><span className={styles["item-span"]}>Quantity: </span>{`${book.quantity}`}</p>
                                        <p><span className={styles["item-span"]}>Category: </span>{`${book.category}`}</p>
                                        <p><span className={styles["item-span"]}>Price: </span>{` \u20A8 ${book.price}`}</p>
                                    </div>
                                </div>))
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
        </div>
    )
}

export default IssueDashboard;