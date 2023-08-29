import style from './searchBar.module.css';
import { useState } from 'react';
//import lupa from './search.png';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('')

    const handleSearch = (event) => {
        let { value } = event.target;
        setInput(value)
    }

    const onSearch = (name) => {
        if (!name) return;
        dispatch(actions.getToolsByName(name));
        dispatch(actions.setCurrentPage(1));
        setInput("");
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          onSearch(input);
        }
      };

    return (
        <div className={style.searchBar}>
            <input type='search' className={style.input} value={input} onChange={handleSearch} placeholder='Buscar productos por nombre' onKeyDown={handleKeyDown}/>
            <span>|</span>
            <button className={style.onSearch} onClick={() => onSearch(input)}>
      <FontAwesomeIcon className={style.lupa} icon={faSearch} />
    </button>
            
        </div>
    )
}