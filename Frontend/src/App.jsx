import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import './App.css'
import NavBarDizajn from './components/NavBarDizajn';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Pocetna from './pages/Pocetna';
import DizajneriPregled from './pages/dizajneri/DizajneriPregled';
import DizajneriDodaj from './pages/dizajneri/DizajneriDodaj';
import DizajneriPromjena from './pages/dizajneri/DizajneriPromjena';


function App() {

  return (
    <>
    <Container>
      <NavBarDizajn />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>} />

        <Route path={RouteNames.DIZAJNER_PREGLED} element={<DizajneriPregled/>}/>
        <Route path={RouteNames.DIZAJNER_NOVI} element={<DizajneriDodaj/>}/>
        <Route path={RouteNames.DIZAJNER_PROMJENA} element={<DizajneriPromjena/>}/>

      </Routes>
      <hr/>
      &copy; Dizajn
    </Container>
    
    </>
  )
}

export default App
