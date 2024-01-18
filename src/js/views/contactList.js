import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard.jsx"


export const ContactList = () => {
	const { store: { contacts }, actions: { loadContacts, setCurrentContact } } = useContext(Context)

	useEffect(() => {
		loadContacts()
		setCurrentContact("")
	}, [contacts])

	return (
		<div className="text-center mt-5">
			{
			contacts.map((item, i) => {
			return <ContactCard 
			name={item.full_name}
			address={item.address}
			phone={item.phone}
			email={item.email}
			index={item.id}
			key={i}
			/>
			})
			}
		</div>)
}
