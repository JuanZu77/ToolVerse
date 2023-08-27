import style from './searchBar.module.css';
import { useState } from 'react';
import lupa from './search.png';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../redux/actions';

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
            <input type='search' className={style.input} value={input} onChange={handleSearch} placeholder=' Busqueda por producto' onKeyDown={handleKeyDown}/>
            <button className={style.onSearch} onClick={() => onSearch(input)}> <img className={style.lupa} src={lupa} alt="lupa" /> </button>
            <span> </span>
        </div>
    )
}