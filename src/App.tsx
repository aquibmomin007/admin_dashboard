import React, {  } from 'react';
import './App';
import Dashboard from './components/Dashboard/Dashboard';
import styles from './App.module.scss'

const App = () => {

  return (
    <div className={styles.App}>
      <div className={styles.mainContainer}>
        <h2>GovTech Book Store</h2>
        <div className={styles.tableContainer}>
          <Dashboard/>
        </div>
      </div>
    </div>
  );
}

export default App;
