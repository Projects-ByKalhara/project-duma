
import React, { useEffect } from 'react'
import './WarningSection.css'
import { Container } from 'react-bootstrap'
import { useState } from 'react';
import { ref, onValue } from "firebase/database";
import DB from '../../Database/Firebase';

function WarningSection() {

  let [average,setAverage] = useState();

  useEffect(() => {

    const averageRef = ref(DB,'Feed/average');
    onValue(averageRef, (snapshot) => {
      const data = snapshot.val();
      setAverage(data);
    });

  }, []);

  return (
    <Container>
      <div className="warning-outer" >
        <div className="warning-title">
          Warnings
        </div>
        <div className="warning-content">
          {average > 50 ? <div className="warning-text-good">The Pet is in Good Health</div> : <div className="warning-text-bad">The Pet is in Bad Health</div>}
        </div>
      </div>
    </Container>
  )
}

export default WarningSection