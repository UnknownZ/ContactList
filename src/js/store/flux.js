const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			URL: "https://playground.4geeks.com/apis/fake/contact/",
			agenda: "agenda/test",
			contacts: [],
			currentContact: "",
			nameTest: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/ ,
			phoneTest: /^[0-9]*$/ ,
			addressTest: /^\s*\S+(?:\s+\S+){2}/  ,
			emailTest: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ,

		},
		actions: {
			loadContacts: async (method) => {
				const store = getStore()
				let list = []
				let response
				let headersList = {
					"Content-Type": "application/json"
				}
				response = await fetch(store.URL + store.agenda, {
					method: "GET",
					headers: headersList	
				});

				let data = await response.json();
				data.map((contact) =>{
					list.push(contact)
				})
				setStore({contacts: list})
			},

			saveContact: (body) => {
				const store = getStore()
				let response = fetch(store.URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				});
				return response
			},

			validateData: (fullName, address, email, phone) => {
				const store = getStore()
				if(fullName === "" || !store.nameTest.test(fullName))
					return false
				else if(!store.addressTest.test(address) || address==="")
					return false
				else if(!store.emailTest.test(email) || email === "")
					return false
				else if(!store.phoneTest.test(phone) || phone === "")
					return false
				else 
					return true			
			},

			deleteContact: (id) => {
				const store = getStore()
				console.log(store.URL+id)
				let response = fetch(store.URL+id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
				});
				return response
			},

			setCurrentContact: (id) => {
                setStore({
                    currentContact: id
                })
            },

			updateContact: (id, body) => {
				const store = getStore()
				console.log(store.URL+id)
				let response = fetch(store.URL+id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				});
				return response
			},
		}
	};
};

export default getState;
