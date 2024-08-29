import { createBrowserRouter } from 'react-router-dom';
import CreateAccount from '../components/createAccount/CreateAccount';
import LoginForm from '../components/login/LoginForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CreateAccount/>
    },
    {
        path: '/login',
        element: <LoginForm/>
    }
]);

export default router
