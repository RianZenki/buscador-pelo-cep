import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import api from './services/api'
import './styles.css'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  const handleSearch = async () => {

      if(input) {
          try{
              const response = await api.get(`${input}/json`)
              setCep(response.data)
              setInput('')
          }catch {
              alert('Erro na busca')
              setInput('')
          }
      }
      else {
          console.log('Preencha com algum CEP')
          return
      }
  }

  return (
    <div className="container">
        <h1 className="title">Buscador CEP</h1>

        <div className="containerInput">
            <input 
                type="text"
                placeholder="Digite seu CEP"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            
            <button className="buttonSearch" onClick={handleSearch}>
                <FiSearch size={25} color="#FFF" />
            </button>
        </div>

        {Object.keys(cep).length > 1 && (
            <main className="main">
                <h2>CEP: {cep.cep}</h2>

                <span>Logradouro: {cep.logradouro}</span>
                <span>Complemento: {cep.complemento}</span>
                <span>{cep.bairro}</span>
                <span>{`${cep.localidade} - ${cep.uf}`}</span>
            </main>
        )}

    </div>
  );
}

export default App;
