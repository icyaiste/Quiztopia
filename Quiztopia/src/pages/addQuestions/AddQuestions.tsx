import { useState, useEffect } from 'react';
import Leaflet from '../../components/map/Leaflet';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './AddQuestions.css';

const BAS_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com'

interface Position {
    latitude: number;
    longitude: number;
}

interface AddQuestionsProps {
    quizName: string;
}

function AddQuestions() {
    const location = useLocation();
    // Check if location.state is defined and has quizName
    const quizName = location.state?.quizName as AddQuestionsProps;
    const navigate = useNavigate();

    const [position, setPosition] = useState<Position | undefined>();
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    useEffect(() => {
        if ('geolocation' in navigator && !position) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        }
    }, [position]);

    const submitQuestion = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!position) {
            console.error('Error setting your position');
            return;
        }

        const questionBody = {
            name: quizName,
            question: question,
            answer: answer,
            location: {
                longitude: position.longitude.toString(),
                latitude: position.latitude.toString()
            }
        };
        console.log('Request Body:', JSON.stringify(questionBody));

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log('No token found in sessionStorage');
                return;
            }
            console.log('Token:', token); // Debugging line to check token
            const response = await fetch(`${BAS_URL}/quiz/question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(questionBody)
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.text(); // Use text() to ensure you get the raw response body
                console.error('Error in POST request:', errorData);
                return;
            }
            const data = await response.json();
            console.log('Question added successfully', data);
        } catch (error) {
            console.error('Failed to add question', error);
        }
    };

    const goBack = () => {
        navigate('/all');
    }

    return (
        <main className='wrap'>
            <button className='goBack' onClick={goBack} type='button'>Home</button>
            <form className='questions' onSubmit={submitQuestion}>
                <input className='input' type='text' placeholder='Question' value={question} onChange={(event) => setQuestion(event.target.value)} />
                <input className='input' type='text' placeholder='Answer' value={answer} onChange={(event) => setAnswer(event.target.value)} />
                <button className='savebtn' type='submit'>Save</button>
            </form>
            <article className='mapContainer'>
                <Leaflet setPosition={setPosition} />
            </article>

        </main>
    )
}
export default AddQuestions;
