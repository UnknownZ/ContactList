import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


function ContactForm() {
    const { store: { currentContact, nameTest, phoneTest, addressTest, emailTest }, actions: { saveContact, updateContact, validateData, setCurrentContact, resetData } } = useContext(Context)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [validName, setValidName] = useState(false)
    const [validPhone, setValidPhone] = useState(false)
    const [validAddress, setValidAddress] = useState(false)
    const [validEmail, setValidEmail] = useState(false)


    useEffect(() => {
        resetData()
    }, [])

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
        if(nameTest.test(name))
        setValidName(true)
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
        if(emailTest.test(email))
        setValidEmail(true)
    }

    const phoneChange = (e) => {
        setPhone(e.target.value)
        if(phoneTest.test(phone))
        setValidPhone(true)
    }

    const addressChange = (e) => {
        setAddress(e.target.value)
        if(addressTest.test(address))
        setValidAddress(true)
    }

    return (
        <div className="text-center mt-5">
            {currentContact == "" ? (
                <div>
                    <h1>Adding new contact</h1>
                </div>
            ) : (
                <div>
                    <h1>Editing contact</h1>
                </div>
            )}

            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="InputName">Full Name</label>
                        <input type="text" className="form-control" value={name} id="InputName" onChange={nameChange} placeholder="Full Name"></input>
                        {validName ? (
                            <></>
                        ) : (
                            <div>
                                <div id="NameInvalid" className="form-text">
                                    Name is invalid
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="text" className="form-control" value={email} id="InputEmail" onChange={emailChange} placeholder="Enter email"></input>
                        {validEmail ? (
                            <></>
                        ) : (
                            <div>
                                <div id="NameInvalid" className="form-text">
                                    Email is invalid
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPhone">Phone</label>
                        <input type="text" className="form-control" value={phone} id="InputPhone" onChange={phoneChange} placeholder="Enter phone"></input>
                        {validPhone ? (
                            <></>
                        ) : (
                            <div>
                                <div id="NameInvalid" className="form-text">
                                    Phone is invalid
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputAddress">Address</label>
                        <input type="text" className="form-control" value={address} id="InputAddress" onChange={addressChange} placeholder="Enter address"></input>
                        {validAddress ? (
                            <></>
                        ) : (
                            <div>
                                <div id="NameInvalid" className="form-text">
                                    Address is invalid
                                </div>
                            </div>
                        )}
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