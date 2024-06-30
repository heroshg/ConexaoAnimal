import AbrigoListar from './components/pages/abrigo/abrigo-listar';
import AdocaoListar from './components/pages/adocao/adocao-listar';
import ListarPet from './components/pages/pet/pet-listar';
import Home from './components/pages/home'; 
import './index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <nav className="bg-blue-800 p-4">
                    <ul className="flex justify-around">
                        <li>
                            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/abrigos" className="text-white hover:text-gray-200">Abrigos</Link>
                        </li>
                        <li>
                            <Link to="/adocoes" className="text-white hover:text-gray-200">Adoções</Link>
                        </li>
                        <li>
                            <Link to="/pets" className="text-white hover:text-gray-200">Pets</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path='/' element={<Home />} /> 
                    <Route path='/abrigos' element={<AbrigoListar />} />
                    <Route path='/pets' element={<ListarPet />} />
                    <Route path='/adocoes' element={<AdocaoListar />} />
                </Routes>

            </BrowserRouter>
        </>
    );
}

export default App;