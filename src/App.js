import './App.css';
import  InputForm from './Components/Form/Form'
import CustomAppBar from './Components/NavBar/NavBar';

function App() {
  return (

    <div className='App' >
      <CustomAppBar mainPage = { <InputForm/>}/>
    </div>

  );
}

export default App;
