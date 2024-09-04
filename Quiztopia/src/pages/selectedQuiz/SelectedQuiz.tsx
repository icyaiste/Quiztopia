import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import leaflet from "leaflet";
import "./selectedQuiz.css";

const BAS_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com';

interface Question {
    question: string;
    answer: string;
    location: {
        longitude: number;
        latitude: number;
    };
}

interface Quiz {
    questions: Question[];
    userId: string;
    quizId: string;
}

interface LocationState {
    userId: string;
    quizId: string;
}

function SelectedQuiz() {
    const location = useLocation();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const { userId, quizId } = location.state as LocationState;
    const mapRef = useRef<leaflet.Map | null>(null); // Ref to store the map instance


    const fetchSelectedQuiz = async () => {
        try {
            const response = await fetch(`${BAS_URL}/quiz/${userId}/${quizId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                console.log('Something wrong with response');
                return;
            }

            const data = await response.json();
            setQuiz(data.quiz);
        } catch (error) {
            console.log('Failed to fetch quiz');
        }
    };
    useEffect(() => {
        fetchSelectedQuiz();
    }, [userId, quizId]);


    useEffect(() => {
        if (quiz && quiz.questions.length > 0) {
            const { latitude, longitude } = quiz.questions[0].location;

            // Initialize map if not already initialized
            if (!mapRef.current) {
                mapRef.current = leaflet.map('thisMap').setView([latitude, longitude], 15);

                leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }).addTo(mapRef.current);
            }

            // Adding markers for all quiz questions
            if (mapRef.current) {
                quiz.questions.forEach((question) => {
                    leaflet.marker([question.location.latitude, question.location.longitude])
                        .addTo(mapRef.current)
                        .bindPopup(question.question)
                        .openPopup();
                });
            }
        }

            // Cleanup map on unmount
            return () => {
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null; // Reset the ref
                }
            };
        }, [quiz]);

    if (!quiz) {
        return <p>Loading...</p>;
    }


    return (
        <div>
            <h1>Quiz ID: {quiz.quizId}</h1>
            <div id="thisMap" />
        </div>
    );
}
export default SelectedQuiz