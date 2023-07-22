import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "./Dashboard.css";
import WarningSection from '../components/WarningSection/WarningSection';
import VideoSection from '../components/VideoSection/VideoSection';
import AudioSection from '../components/AudioSection/AudioSection';
import HeaderSection from '../components/HeaderSection/HeaderSection';
import WaterSection from '../components/WaterSection/WaterSection';
import ModeSelection from '../components/ModeSelection/ModeSelection';
import FeedScheduler from '../components/FeedScheduler/FeedScheduler';
import { useState, useEffect } from 'react';
import { ref, onValue ,set } from "firebase/database";
import DB from '../Database/Firebase';

function Dashboard(mode) {
  let [currentMode, setCurrentMode] = useState(0);

  useEffect(() => {
    const modeRef = ref(DB, 'Mode/currentMode');
    onValue(modeRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentMode(data);
    });
  }, []);

  set(ref(DB, 'Mode/currentMode'), currentMode);

  const handleModeChange = (mode) => {
    if (currentMode === mode) {
      setCurrentMode(0);
    } else {
      setCurrentMode(mode);
    }
  }

    return (
      <>
        <Container className='container-outer col-md-4 col-10'>
          <Row>
            <Col>
              <HeaderSection />
            </Col>
          </Row>
          <Row >
            <Col >
              <WarningSection />
            </Col>
          </Row>
          <Row>
            <Col>
              <ModeSelection currentMode={currentMode} handleModeChange={(mode) => handleModeChange(mode)} />
            </Col>
          </Row>
          <Row>
            <Col>
              <FeedScheduler handleModeChange={(mode) => handleModeChange(mode)}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <WaterSection />
            </Col>
          </Row>
          <Row>
            <Col>
              <VideoSection currentMode={currentMode} handleModeChange={(mode) => handleModeChange(mode)}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <AudioSection currentMode={currentMode} handleModeChange={(mode) => handleModeChange(mode)}/>
            </Col>
          </Row>
        </Container>
      </>
    )
  }


  export default Dashboard