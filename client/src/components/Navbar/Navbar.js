import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsXLg } from "react-icons/bs"
import styles from "./Navbar.module.css";

function Navbar() {
	const navRef = useRef();
	const [isAdmin, setIsAdmin] = useState(true)

	const showNavbar = () => {
		navRef.current.classList.toggle(
			styles["responsive_nav"]
		);
	};

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<Link to={`/dashboard`}>Dashboard</Link>
				<Link to={`/addbook`}>Add Book</Link>
				{isAdmin && <Link to={`/issue`}>View Issues</Link>}
				<button
					className={`${styles["nav-btn"]} ${styles["nav-close-btn"]}`}
					onClick={showNavbar}>
					<BsXLg />
				</button>
			</nav>
			<button
				className={styles["nav-btn"]}
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;