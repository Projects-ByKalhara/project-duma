import React from 'react'
import "./WaterSection.css"
import { Container, } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState, useEffect } from 'react';
import DB from '../../Database/Firebase';
import { ref, onValue} from "firebase/database";

function WaterSection() {
    const [waterLevel, setWaterLevel] = useState(0)

    useEffect(() => {
        const waterLevelRef = ref(DB, 'Water/waterLevel');
        onValue(waterLevelRef, (snapshot) => {
          const data = snapshot.val();
          setWaterLevel(data);
        });
    
      }, []);


    return (
        <Container>
            <div className="w-title">
                Water Level
            </div>
            <div className="w-indicator">
                <ProgressBar className="water-progress" now={waterLevel} label={waterLevel} />
            </div>
        </Container>
    )
}

export default WaterSection