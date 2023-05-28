import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "./Dashboard.css";
import WarningSection from '../components/WarningSection/WarningSection';
import FeedSection from '../components/FeedSection/FeedSection';
import EntertainmentSection from '../components/EntertainmentSection/EntertainmentSection';
import VideoSection from '../components/VideoSection/VideoSection';
import AudioSection from '../components/AudioSection/AudioSection';
import HeaderSection from '../components/HeaderSection/HeaderSection';
import WaterSection from '../components/WaterSection/WaterSection';


function Dashboard() {

  return (
    <>
      <Container className='container-outer col-md-6 '>
        <Row className="colb">
          <Col>
            <HeaderSection />
          </Col>
        </Row>
        <Row className="justify-content-center colb">
          <Col >
            <WarningSection />
          </Col>
        </Row>
        <Row className='justify-content-center colb'>
          <Col className="colb">
            <FeedSection />
          </Col>
          <Col className='colb'>
            <EntertainmentSection />
          </Col>
        </Row>
        <Row>
          <Col className='colb'>
            <WaterSection />
          </Col>
        </Row>
        <Row className="colb">
          <Col>
            <VideoSection />
          </Col>
        </Row>
        <Row className="colb">
          <Col>
            <AudioSection />
          </Col>
        </Row>
      </Container>
    </>
  )
}


export default Dashboard