import React from 'react'
import { Container, ToggleButton } from 'react-bootstrap'
import './ModeSelection.css'
import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';

function ModeSelection() {
    const [checkedFeed, setCheckedFeed] = useState(false);
    const [checkedEntertainment, setCheckedEntertainment] = useState(false);

    useEffect(() => {
        const feedRef = ref(DB, 'Feed/feedMotor');
        onValue(feedRef, (snapshot) => {
            const data = snapshot.val();
            if(checkedEntertainment){
                setCheckedEntertainment(!checkedEntertainment);
                set(ref(DB, 'Entertainment/entertainmentSystem'), !checkedEntertainment);
            }
            setCheckedFeed(data);            
        });
        const entertainmentRef = ref(DB, 'Entertainment/entertainmentSystem');
        onValue(entertainmentRef, (snapshot) => {
            const data = snapshot.val();
            if (checkedFeed){
                setCheckedFeed(!checkedFeed);
                set(ref(DB, 'Feed/feedMotor'), !checkedFeed);
            }
            setCheckedEntertainment(data);
        });
    }, []);

    const handleChangeFeed = () => {
        if(checkedEntertainment){
            setCheckedEntertainment(!checkedEntertainment);
            set(ref(DB, 'Entertainment/entertainmentSystem'), !checkedEntertainment);
        }
        setCheckedFeed(!checkedFeed);
        set(ref(DB, 'Feed/feedMotor'), !checkedFeed);
    };

    const handleChangeEntertainment = () => {
        if (checkedFeed){
            setCheckedFeed(!checkedFeed);
            set(ref(DB, 'Feed/feedMotor'), !checkedFeed);
        }
        setCheckedEntertainment(!checkedEntertainment);
        set(ref(DB, 'Entertainment/entertainmentSystem'), !checkedEntertainment);
    };

    return (
        <Container>
            <div className="modes-outer">
                <div className="f-outer">
                    <div className="modes-title">
                        Modes
                    </div>
                    <ToggleButton
                        className="col-11 btn"
                        id="checkFeed"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checkedFeed}
                        value="2"
                        onChange={handleChangeFeed}
                    >
                        {checkedFeed ? 'Stop Feeding' : 'Start Feeding'}
                    </ToggleButton>
                </div>
                <div className="e-outer">
                    <ToggleButton
                        className="col-11 btn align-items-center justify-content-center"
                        id="checkEntertainment"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checkedEntertainment}
                        value="1"
                        onChange={handleChangeEntertainment}
                    >
                        {checkedEntertainment ? 'Stop Entertainment Mode' : 'Start Entertainment Mode'}
                    </ToggleButton>
                </div>
            </div>
        </Container>
    )
}

export default ModeSelection