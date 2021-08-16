import { createContext , useState} from "react"

export const PokePlayerContext = createContext()

const PokePlayerState = ({children})=>{
  const [pokePlayer, setPokePlayer] = useState([]);
    return (
    <PokePlayerContext.Provider value={{pokePlayer, setPokePlayer}}>
        {children}
    </PokePlayerContext.Provider>
    )
}

export default PokePlayerState

