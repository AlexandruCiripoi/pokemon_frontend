import { createContext , useState} from "react"

export const PokePlayerContext = createContext()

const PokePlayerState = ({children})=>{
  const [pokePlayer, setPokePlayer] = useState({
    "id": 0,
    "name": {
      "english": "",
      "japanese": "",
      "chinese": "",
      "french": ""
    },
    "type": [
      ""
    ],
    "base": {
      "HP": 0,
      "Attack": 0,
      "Defense": 0,
      "Sp. Attack": {" Attack": 0,
      " Defense": 0},
      "Speed": 0
    }
  });

  const [opponent, setOpponent] = useState({
    "id": 0,
    "name": {
      "english": "",
      "japanese": "",
      "chinese": "",
      "french": ""
    },
    "type": [
      ""
    ],
    "base": {
      "HP": 0,
      "Attack": 0,
      "Defense": 0,
      "Sp. Attack": {" Attack": 0,
      " Defense": 0},
      "Speed": 0
    }
  });

    return (
    <PokePlayerContext.Provider value={{pokePlayer, setPokePlayer, opponent, setOpponent }}>
        {children}
    </PokePlayerContext.Provider>
    )
}

export default PokePlayerState

