import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
    const [quizName, setQuizName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreateQuiz = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = sessionStorage.getItem('token');// Retrieve the token from sessionStorage
        if (!token) {
            setError('No valid token found. Please log in again.');
            navigate('/login')// Redirect to login if token is missing
            return;
        }
        const requestBody = { 'name': quizName };

        try {
            const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token for authentication
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            navigate('/addquestions');// Redirect to add questions page after successful quiz creation

            if (response.ok) {
                if (data.success) {
                    setSuccess(`Quiz created successfully! Quiz ID: ${data.quizId}`);
                    setError(null); // Clear any previous error
                    console.log('Quiz created successfully:', data);
                } else {
                    setError('Failed to create quiz. Please try again later.');
                    console.error('Quiz creation failed:', data);
                }
            } else if (response.status === 401) {
                setError(`Invalid token: ${data.error}. Please log in again.`);
                navigate('/login'); // Redirect to login if token is invalid
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    }
    return (
        <div>
            <h2>Create a New Quiz</h2>
            <form onSubmit={handleCreateQuiz}>
                <label>
                    Quiz Name:
                    <input
                        type="text"
                        value={quizName}
                        onChange={(event) => setQuizName(event.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Quiz</button>
            </form>
            <button type='button' onClick={() => navigate('/login')}>Log in with another account</button>
        </div>
    )
}


export default CreateQuiz
