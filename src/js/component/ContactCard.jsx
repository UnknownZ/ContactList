import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";


function ContactCard({ name, address, email, phone, index }) {
	const { store: { contacts }, actions: { deleteContact, setCurrentContact } } = useContext(Context)
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
	}, [contacts])

	function editContact() {
		setCurrentContact(index)
	}

	function deleteCont() {
		deleteContact(index)
		handleClose()
	}

	return (
		<>
			<h1>{name}</h1>
			<div>
				<p>Address: {address}</p>
				<p>Email: {email}</p>
				<p>Phone: {phone}</p>
			</div>
			<div>
				<Link className="btn btn-primary" onClick={editContact} to="/contactForm">Edit</Link>
				<button className="btn btn-primary" onClick={handleShow}>Delete</button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-secondary" onClick={handleClose}>
						Close
					</button>
					<button className="btn btn-danger" onClick={deleteCont}>
						Delete Contact
					</button>
				</Modal.Footer>
			</Modal>

		</>
	)
}

export default ContactCard