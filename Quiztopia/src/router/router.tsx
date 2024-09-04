import { createBrowserRouter } from 'react-router-dom';
import CreateAccount from '../pages/createAccount/CreateAccount';
import LoginForm from '../pages/login/LoginForm';
import CreateQuiz from '../pages/createQuiz/CreateQuiz';
import AddQuestions from '../pages/addQuestions/AddQuestions';
import AllQuizzes from '../components/allQuizzes/AllQuizzes';
import SelectedQuiz from '../pages/selectedQuiz/SelectedQuiz';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CreateAccount/>
    },
    {
        path: '/login',
        element: <LoginForm/>
    },
    {
        path: '/createquiz',
        element: <CreateQuiz/>
    },
    {
        path: '/addquestions',
        element: <AddQuestions/>
    },
    {
        path: '/all',
        element: <AllQuizzes/>
    },
    {
        path: '/selectedquiz',
        element: <SelectedQuiz/>
    }
]);

export default router
