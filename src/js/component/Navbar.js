import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="ml-right">
				<Link to="/contactForm">
                    <button className="btn btn-primary">Add a new contact</button>
				</Link>
			</div>
		</nav>
	);
};