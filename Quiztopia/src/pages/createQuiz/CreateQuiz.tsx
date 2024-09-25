import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateQuiz.css';

function CreateQuiz() {
  const [quizName, setQuizName] = useState<string>('');
  const navigate = useNavigate();

  const handleCreateQuiz = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }
    const requestBody = { name: quizName };

    try {
      const response = await fetch(
        'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      navigate('/addquestions', { state: { quizName } });

      if (response.ok) {
        if (data.success) {
          console.log('Quiz created successfully:', data);
        } else {
          console.error('Quiz creation failed:', data);
        }
      } else if (response.status === 401) {
        navigate('/login'); // Redirect to login if token is invalid
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const seeAllQuizzes = () => {
    navigate('/all');
  };

  return (
    <main>
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
        <button className="CreateQuiz" type="submit">
          Create Quiz
        </button>
      </form>
      <button
        className="Login2"
        type="button"
        onClick={() => navigate('/login')}
      >
        Log in with another account
      </button>
      <button className="allQuizzes" onClick={seeAllQuizzes} type="button">
        See all quizzes
      </button>
    </main>
  );
}

export default CreateQuiz;
