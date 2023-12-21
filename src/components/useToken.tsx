import { useState } from 'react';

export default function useToken() {
	const getToken = () => {
		const tokenString = sessionStorage.getItem('token');
		return tokenString
	};

	const [token, setToken] = useState(getToken());

	const saveToken = function (userToken: string | null) {
        if (userToken)
		    sessionStorage.setItem('token', userToken);
        else
            sessionStorage.removeItem("token");
		setToken(userToken);
	};

	return {
		setToken: saveToken,
		token
	}
}