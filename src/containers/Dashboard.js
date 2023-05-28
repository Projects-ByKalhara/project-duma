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
        <Row className="">
          <Col>
            <HeaderSection />
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <Col >
            <WarningSection />
          </Col>
        </Row>
        <Row className='justify-content-center '>
          <Col className="">
            <FeedSection />
          </Col>
          <Col className=''>
            <EntertainmentSection />
          </Col>
        </Row>
        <Row>
          <Col className=''>
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