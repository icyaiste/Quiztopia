import './App.css'
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import CreateAccount from './components/createAccount/CreateAccount';


function App() {

  return (
    <main>
      <h1>Quiztopia</h1>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
