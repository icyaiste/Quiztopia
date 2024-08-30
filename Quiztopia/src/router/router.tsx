import { createBrowserRouter } from 'react-router-dom';
import CreateAccount from '../components/createAccount/CreateAccount';
import LoginForm from '../components/login/LoginForm';
import CreateQuiz from '../components/createQuiz/CreateQuiz';

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
    }
]);

export default router
