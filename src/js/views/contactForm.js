import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


function ContactForm() {
    const { store: { currentContact }, actions: { saveContact, updateContact, validateData, setCurrentContact } } = useContext(Context)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const addContact = async (e) => {

        e.preventDefault()
        const body = {
            "full_name": name,
            "email": email,
            "address": address,
            "phone": phone,
            "agenda_slug": "test"
        }

        const newContact = () => {
            saveContact(body)
            toast("Contact saved!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        const refreshContact = () => {
            updateContact(currentContact, body)
            toast("Contact updated!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setCurrentContact("")
        }


        if (validateData(name, address, email, phone)) {
            if (currentContact === "") {
                newContact()
            }
            else {
                refreshContact()
            }
        }
        else {
            toast.info("Please validate the contact information")
        }
    }

    const nameChange = e => {
        setName(e.target.value)
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
    }

    const phoneChange = (e) => {
        setPhone(e.target.value)
    }

    const addressChange = (e) => {
        setAddress(e.target.value)
    }

    return (
        <div className="text-center mt-5">
            <h1>Add a new contact</h1>
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="InputName">Full Name</label>
                        <input type="text" className="form-control" value={name} id="InputName" onChange={nameChange} placeholder="Full Name"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="text" className="form-control" value={email} id="InputEmail" onChange={emailChange} placeholder="Enter email"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputEmail">Phone</label>
                        <input type="text" className="form-control" value={phone} id="InputPhone" onChange={phoneChange} placeholder="Enter phone"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputEmail">Address</label>
                        <input type="text" className="form-control" value={address} id="InputAddress" onChange={addressChange} placeholder="Enter address"></input>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={addContact}>Save</button>
                </form>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />

                <Link to="/contact">
                    <span>Or get back to contacts</span>
                </Link>
            </div>
        </div>
    )
}

export default ContactForm