import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "./Dashboard.css";
import WarningSection from '../components/WarningSection/WarningSection';
import VideoSection from '../components/VideoSection/VideoSection';
import AudioSection from '../components/AudioSection/AudioSection';
import HeaderSection from '../components/HeaderSection/HeaderSection';
import WaterSection from '../components/WaterSection/WaterSection';
import ModeSelection from '../components/ModeSelection/ModeSelection';

function Dashboard() {

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
          <ModeSelection />
          </Col>
        </Row>
        <Row>
          <Col>
            <WaterSection />
          </Col>
        </Row>
        <Row>
          <Col>
            <VideoSection />
          </Col>
        </Row>
        <Row>
          <Col>
            <AudioSection />
          </Col>
        </Row>
      </Container>
    </>
  )
}


export default Dashboard