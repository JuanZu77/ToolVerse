import React from 'react';
import styles from "./FilterBar.module.css";

const FilterBar = (props) => {
    return (
        <nav className={styles.filterBar}>
        <div>
            {props.children}
        </div>
        </nav>
    );
}

export default FilterBar;
