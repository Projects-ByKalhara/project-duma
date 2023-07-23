import React from 'react'
import { Container, ToggleButton } from 'react-bootstrap'
import './ModeSelection.css'
import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';
import { setOpHandler } from '@tensorflow/tfjs-core/dist/tensor';

function ModeSelection(props) {

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
                        checked={props.currentMode === 1 ? true : false}
                        value="2"
                        onChange={() => props.handleModeChange(1)}
                    >
                        {props.currentMode === 1 ? 'Stop Feeding' : 'Start Feeding'}
                    </ToggleButton>
                </div>
                <div className="e-outer">
                    <ToggleButton
                        className="col-11 btn align-items-center justify-content-center"
                        id="checkEntertainment"
                        type="checkbox"
                        variant="outline-primary"
                        checked={props.currentMode === 2 ? true : false}
                        value="1"
                        onChange={() => props.handleModeChange(2)}
                    >
                        {props.currentMode === 2 ? 'Stop Entertainment Mode' : 'Start Entertainment Mode'}
                    </ToggleButton>
                </div>
            </div>
        </Container>
    )
}

export default ModeSelection