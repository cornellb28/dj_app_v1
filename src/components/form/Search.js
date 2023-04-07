import React, {useState} from 'react'
import Input from './Input';

function Search() {
    const [input, setInput] = useState('');

    const handleChange = (value) => {
        setInput(value);
        // fetch data fetchData(value)
    }
  return (
    <div id="search-wrapper">
        <Input text="text" placeholder="Type to search...." value={input} onChange={(e) => handleChange(e.target.value)} />
    </div>
  )
}

export default Search


// https://www.youtube.com/watch?v=sWVgMcz8Q44