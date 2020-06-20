import React,{useState} from 'react'
import Axios from 'axios'
import './App.css'
import {Recipe} from './component/Recipe'
import {v4 as uuidv4} from 'uuid'
import Alert from './component/Alert'

const App = () => {
const[query,setQuery]= useState('')
const[recipe,setRecipe]=useState([])
const [alert, setAlert] = useState("");
    const App_Id="51597ca1"
    const App_Key="b82e356aa653d805d89e4ee0b35bd103"
    
    const url=`https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`

    const getData= async ()=>{
        if (query !== "") {
    const result=await Axios.get(url)
    if (!result.data.more) {
        return setAlert("No food with such name");
    }
    setRecipe(result.data.hits)
    console.log(result)
    setQuery('')
    setAlert("");
} else {
    setAlert("Please fill the form");
  }
    }
const submit=(e)=>{
e.preventDefault()
getData()
}
const change=(e)=>{
// console.log(e.target.value)
setQuery(e.target.value)
}
    return (
        <div className='App'>
      <h1 onClick={getData} >Food Search</h1>     
      <form className='search' onSubmit={submit} >
      {alert !== "" && <Alert alert={alert} />}
          <input type='text'placeholder='search food' autoComplete='off' onChange={change} value={query} name='query' />
          <input type='submit' value='search'/>
          </form> 
          <div className='recipes'>
    {recipe !== [] && 
    recipe.map(recipe =>
       <Recipe key={uuidv4()} recipe={recipe} />
    )
}
          </div>
        </div>
    )
}

export default App
