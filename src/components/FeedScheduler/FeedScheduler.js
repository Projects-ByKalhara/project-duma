import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import './FeedScheduler.css'
import { useState, useEffect } from 'react';

function FeedScheduler(props) {

    const [schedule1, setSchedule1] = useState(0);
    const [schedule2, setSchedule2] = useState(0);
    const [schedule3, setSchedule3] = useState(0);

    let [countSchedule1, setCountSchedule1] = useState(0);
    let [countSchedule2, setCountSchedule2] = useState(0);
    let [countSchedule3, setCountSchedule3] = useState(0);


    const handleSave = () => {
        setSchedule1(document.getElementById('schedule1').value);
        setSchedule2(document.getElementById('schedule2').value);
        setSchedule3(document.getElementById('schedule3').value);
    }

    const handleReset = () => {
        document.getElementById('schedule1').value = 0;
        document.getElementById('schedule2').value = 0;
        document.getElementById('schedule3').value = 0;
        setSchedule1(0);
        setSchedule2(0);
        setSchedule3(0);
        setCountSchedule1(0);
        setCountSchedule2(0);
        setCountSchedule3(0);
    }

    useEffect(() => {

        const checkFeedSchedule = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();

            if (hour < 6 || hour > 22) {
                handleReset();
                props.handleModeChange(0);
            } else if ((hour === schedule1) && (countSchedule1 < 1)) {
                props.handleModeChange(1);
                setCountSchedule1(1);
                setSchedule1(0);
                document.getElementById('schedule1').value = 0;
            } else if ((hour === schedule2) && (countSchedule2 < 1)) {
                props.handleModeChange(1);
                setCountSchedule2(1);
                setSchedule2(0);
            } else if ((hour === schedule3) && (countSchedule3 < 1)) {
                props.handleModeChange(1);
                setCountSchedule3(1);
                setSchedule3(0);
            }
        }, 3600000);

        return () => {
            clearInterval(checkFeedSchedule);
        }

    },[]);

    

    return (
        <>
            <Container>
                <div className="schedule-outer">
                    <h1 className='scheduler-outer-title'>FeedScheduler</h1>
                    <div className="schedule-content">
                        <Row>
                            <Col className='schedule-title'>Schedule 1</Col>
                            <Col className='schedule-input'>
                                <Form.Select size="sm" id='schedule1'>
                                    <option value="0">Select Time</option>
                                    <option value={6}>6.00 AM</option>
                                    <option value={7}>7.00 AM</option>
                                    <option value={8}>8.00 AM</option>
                                    <option value={9}>9.00 AM</option>
                                    <option value={10}>10.00 AM</option>
                                    <option value={11}>11.00 AM</option>
                                    <option value={12}>12.00 PM</option>
                                    <option value={13}>1.00 PM</option>
                                    <option value={14}>2.00 PM</option>
                                    <option value={15}>3.00 PM</option>
                                    <option value={16}>4.00 PM</option>
                                    <option value={17}>5.00 PM</option>
                                    <option value={18}>6.00 PM</option>
                                    <option value={19}>7.00 PM</option>
                                    <option value={20}>8.00 PM</option>
                                    <option value={21}>9.00 PM</option>
                                    <option value={22}>10.00 PM</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='schedule-title'>Schedule 2</Col>
                            <Col className='schedule-input'>
                                <Form.Select size="sm" id='schedule2'>
                                    <option value="0">Select Time</option>
                                    <option value={6}>6.00 AM</option>
                                    <option value={7}>7.00 AM</option>
                                    <option value={8}>8.00 AM</option>
                                    <option value={9}>9.00 AM</option>
                                    <option value={10}>10.00 AM</option>
                                    <option value={11}>11.00 AM</option>
                                    <option value={12}>12.00 PM</option>
                                    <option value={13}>1.00 PM</option>
                                    <option value={14}>2.00 PM</option>
                                    <option value={15}>3.00 PM</option>
                                    <option value={16}>4.00 PM</option>
                                    <option value={17}>5.00 PM</option>
                                    <option value={18}>6.00 PM</option>
                                    <option value={19}>7.00 PM</option>
                                    <option value={20}>8.00 PM</option>
                                    <option value={21}>9.00 PM</option>
                                    <option value={22}>10.00 PM</option>
                                </Form.Select></Col>
                        </Row>
                        <Row>
                            <Col className='schedule-title'>Schedule 3</Col>
                            <Col className='schedule-input' >
                                <Form.Select size="sm" id='schedule3'>
                                    <option value="0">Select Time</option>
                                    <option value={6}>6.00 AM</option>
                                    <option value={7}>7.00 AM</option>
                                    <option value={8}>8.00 AM</option>
                                    <option value={9}>9.00 AM</option>
                                    <option value={10}>10.00 AM</option>
                                    <option value={11}>11.00 AM</option>
                                    <option value={12}>12.00 PM</option>
                                    <option value={13}>1.00 PM</option>
                                    <option value={14}>2.00 PM</option>
                                    <option value={15}>3.00 PM</option>
                                    <option value={16}>4.00 PM</option>
                                    <option value={17}>5.00 PM</option>
                                    <option value={18}>6.00 PM</option>
                                    <option value={19}>7.00 PM</option>
                                    <option value={20}>8.00 PM</option>
                                    <option value={21}>9.00 PM</option>
                                    <option value={22}>10.00 PM</option>
                                </Form.Select></Col>
                        </Row>
                    </div>
                    <div className="schedule-save">
                        <Button onClick={handleSave} variant="primary save-button" size="sm">Save</Button>
                        <Button onClick={handleReset} variant="primary save-button" size="sm">Reset</Button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default FeedScheduler