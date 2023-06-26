import React from 'react'
import './AudioSection.css'
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';
import { ToggleButton } from 'react-bootstrap';

function AudioSection() {
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
            id="audioPlay"
            type="checkbox"
            variant="outline-primary"
            checked={audioPlay}
            value="2"
            onChange={handleChangeAudioPlay}
          >
            {audioPlay ? 'Stop Voice' : 'Start Voice'}
          </ToggleButton>
        </div>
      </div>
    </Container>
  )
}

export default AudioSection