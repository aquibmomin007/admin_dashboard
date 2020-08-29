import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './DashBoard.module.scss'

type DashBoardProps = {
  maxOptionsToShow: number;
  hasAddPermission: boolean;
  options: SelectOption[];
  label?: string;
}

const DashBoard = () => { 
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={styles.DashBoardWrapper}>

    </div>
  )
}

export default DashBoard;