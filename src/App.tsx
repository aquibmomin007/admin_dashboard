import React, {  } from 'react';
import './App';
import BookListing from './components/BookListing/BookListing';
import styles from './App.module.scss'

const App = () => {

  return (
    <div className={styles.App}>
      <div className={styles.mainContainer}>
        <h2>GovTech Book Store</h2>
        <div className={styles.tableContainer}>
          <BookListing/>
        </div>
      </div>
    </div>
  );
}

export default App;
