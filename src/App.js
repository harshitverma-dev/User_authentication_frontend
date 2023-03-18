import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContextProvider from './context/contextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Welcome from './pages/Welcome';
import RegistedUserInfo from './pages/RegistedUserInfo';

function App() {
	const isLogIn = useSelector(state => state.isLogIn);
	console.log(isLogIn)
	return (
		<ContextProvider>
			<Router>
				<header>
					<Header />
				</header>
				<main>
					<Routes>
						{!isLogIn &&
							<Route exact path="/" element={<Welcome />} />
						}
						{!isLogIn &&
							<Route exact path="/login" element={<Login />} />
						}
						{!isLogIn &&
							<Route exact path="/signup" element={<Signup />} />
						}
						{isLogIn &&
							<Route exact path="/home" element={<Home />} />
						}
						{isLogIn &&
							<Route exact path="/RegistedUserInfo" element={<RegistedUserInfo />} />
						}


					</Routes>
				</main>
			</Router>
		</ContextProvider>
	);
}

export default App;
