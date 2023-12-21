import { useState } from 'react';

export default function useToken() {
	const getToken = () => {
        console.log("getToken");
		const tokenString = sessionStorage.getItem('token');
		return tokenString
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (userToken: string) => {
		sessionStorage.setItem('token', JSON.stringify(userToken));
		setToken(userToken);
	};


    console.log("usetoken");
    console.log(token);
	return {
		setToken: saveToken,
		token
	}
}