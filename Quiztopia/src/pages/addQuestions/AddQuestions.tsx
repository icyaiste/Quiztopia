import { useState, useEffect } from 'react';
import Leaflet from '../../components/map/Leaflet';


function AddQuestions() {
    const [position, setPosition] = useState<GeolocationCoordinates>();
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');


    useEffect(() => {
        if ('geolocation' in navigator && !position) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition(position.coords);
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
            name: "test quiz", // Replace with dynamic quiz name later
            question: question,
            answer: answer,
            location: {
                longitude: position.longitude.toString(),
                latitude: position.latitude.toString()
            }
        };

        try {
            const response = await fetch('https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(questionBody)
            });
            console.log(response);
            if (!response.ok) {
                console.error('Error in POST request');
                return;
            }
            const data = await response.json();
            console.log('Question added successfully', data);
        } catch (error) {
            console.error('Failed to add question', error);
        }
    };


    return (
        <main>
            <form onSubmit={submitQuestion}>
                <input type='text' placeholder='Question' value={question} onChange={(event) => setQuestion(event.target.value)} />
                <input type='text' placeholder='Answer' value={answer} onChange={(event) => setAnswer(event.target.value)} />
                <button type='submit'>Save</button>
            </form>
            <article className='mapContainer'>
                <Leaflet setPosition={setPosition}/> 
            </article>

        </main>
    )
}
export default AddQuestions;
