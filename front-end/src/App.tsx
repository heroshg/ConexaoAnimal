import AbrigoListar from './components/pages/abrigo/abrigo-listar';
import EnderecoCadastrar from './components/pages/abrigo/endereco-cadastrar';
import ListarPet from './components/pages/pet/pet-listar';
import './index.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>


    <BrowserRouter>
    <nav >
      <ul className='flex justify-around  top-0 p-4'>
        <li>
        <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/abrigos">Abrigos</Link>
        </li>
        <li>
        <Link to="/adocoes">Adocões</Link>
        </li>
        <li>
        <Link to="/pets">Pets</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path='/abrigos' element={ <AbrigoListar />}></Route>
      <Route path='/pets' element={ <ListarPet /> }></Route>
    </Routes>
    
    <footer className='bottom-0 fixed '>
      <p >&copy;Desenvolvido por Heros Hlatki Godoy & Marcos Alves de Sá & Samuel Almeida Marques Lima</p>
    </footer>
    </BrowserRouter>
    </>
  );
}

export default App;
