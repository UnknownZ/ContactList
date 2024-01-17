import React from "react";
import "../../styles/home.css";

export const Home = () => (
	<div className="text-center mt-5">
		<h1>Welcome! check below to see the contact list</h1>
		<a href="/contact" className="btn btn-success">
			Go to the contact list
		</a>
	</div>
);
