import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
    password: string;
}

function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();


    const SubmitLogin = async (event: React.FormEvent) => {
        event.preventDefault();


        const user: User = { username, password };
        try {
            const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            // console.log(response);
            if (!response.ok) {
                console.error('Error in POST request');
                return;
            }
            const data = await response.json();
            console.log('Login successful', data);
            sessionStorage.setItem('token', data.token);
            navigate('/createquiz');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <form onSubmit={SubmitLogin}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                    ></input>
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    ></input>
                </label>
                <button type="submit">Log in</button>
            </form>
        </main>
    )
}

export default LoginForm
