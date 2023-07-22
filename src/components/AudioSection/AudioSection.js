import React from 'react'
import './AudioSection.css'
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';
import { ToggleButton } from 'react-bootstrap';

function AudioSection(props) {
  const [audioPlay, setAudioPlay] = useState(false);

  useEffect(() => {
    const audioRef = ref(DB, 'Audio/audioPlay');
    onValue(audioRef, (snapshot) => {
      const data = snapshot.val();
      setAudioPlay(data);
    });
  }, []);

  const handleChangeAudioPlay = () => {
    setAudioPlay(!audioPlay);
    set(ref(DB, 'Audio/audioPlay'), !audioPlay);
  };

  return (
    <Container>
      <div className="audio-outer" >
        <div className="audio-title">
          Voice
        </div>
        <div className="audio-content">
          <ToggleButton
            className=" audio-btn"
            id="audio1"
            type="checkbox"
            variant="outline-primary"
            checked={props.currentMode === 4 ? true : false}
            value="2"
            onChange={() => props.handleModeChange(4)}
          >
            {props.currentMode === 4 ? 'Stop Voice 1' : 'Start Voice 1'}
          </ToggleButton>
          <ToggleButton
            className=" audio-btn"
            id="audio2"
            type="checkbox"
            variant="outline-primary"
            checked={props.currentMode === 5 ? true : false}
            value="2"
            onChange={() => props.handleModeChange(5)}
          >
            {props.currentMode === 5 ? 'Stop Voice 2' : 'Start Voice 2'}
          </ToggleButton>
          <ToggleButton
            className=" audio-btn"
            id="audio3"
            type="checkbox"
            variant="outline-primary"
            checked={props.currentMode === 6 ? true : false}
            value="2"
            onChange={() => props.handleModeChange(6)}
          >
            {props.currentMode === 6 ? 'Stop Voice 3' : 'Start Voice 3'}
          </ToggleButton>
        </div>
      </div>
    </Container>
  )
}

export default AudioSection

