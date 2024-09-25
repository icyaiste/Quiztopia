import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './allQuizzes.css';

const BAS_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com';

interface Quiz {
  questions: {
    question: string;
    answer: string;
    location: {
      longitude: string;
      latitude: string;
    };
  }[];
  userId: string;
  quizId: string;
  username: string;
}

function AllQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const response = await fetch(`${BAS_URL}/quiz`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          console.error(
            'Failed to fetch quizzes, something went wrong with response'
          );
          return;
        }
        const data = await response.json();
        setQuizzes(data.quizzes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllQuizzes();
  }, []);

  const handleQuizClick = (userId: string, quizId: string) => {
    navigate('/selectedQuiz', { state: { userId, quizId } });
  };

  const RenderQuizzes = () => {
    return (
      <main className="containerForAllQuizzes">
        {quizzes.map((quiz) => (
          <article
            className="quiz"
            onClick={() => handleQuizClick(quiz.userId, quiz.quizId)}
            key={quiz.quizId}
          >
            <p className="username">Username: {quiz.username}</p>
            <p>Quiz ID: {quiz.quizId}</p>
            <section>
              {quiz.questions.map((index) => (
                <p key={`${quiz.quizId}-${index}`}></p>
              ))}
            </section>
          </article>
        ))}
      </main>
    );
  };

  return (
    <main>
      <h2>Here can you find all quizzes</h2>
      {RenderQuizzes()}
    </main>
  );
}
export default AllQuizzes;
