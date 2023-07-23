import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import './FeedScheduler.css'
import { useState, useEffect } from 'react';
import { ref, onValue, set  ,get} from "firebase/database";
import DB from '../../Database/Firebase';

function FeedScheduler(props) {

    const [schedule1, setSchedule1] = useState(0);
    const [schedule2, setSchedule2] = useState(0);
    const [schedule3, setSchedule3] = useState(0);

    let [countSchedule1, setCountSchedule1] = useState(0);
    let [countSchedule2, setCountSchedule2] = useState(0);
    let [countSchedule3, setCountSchedule3] = useState(0);

    const schedule1Ref = ref(DB, 'Schedule/schedule1');
    const schedule2Ref = ref(DB, 'Schedule/schedule2');
    const schedule3Ref = ref(DB, 'Schedule/schedule3');
    const countSchedule1Ref = ref(DB, 'Schedule/countSchedule1');
    const countSchedule2Ref = ref(DB, 'Schedule/countSchedule2');
    const countSchedule3Ref = ref(DB, 'Schedule/countSchedule3');


    const handleSave = () => {
        const value1 = document.getElementById('schedule1').value;
        const value2 = document.getElementById('schedule2').value;
        const value3 = document.getElementById('schedule3').value;

        setSchedule1(value1);
        setSchedule2(value2);
        setSchedule3(value3);

        set(ref(DB, 'Schedule/schedule1'), value1);
        set(ref(DB, 'Schedule/schedule2'), value2);
        set(ref(DB, 'Schedule/schedule3'), value3);

        alert("Schedule Saved");
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

        set(ref(DB, 'Schedule/schedule1'), 0);
        set(ref(DB, 'Schedule/schedule2'), 0);
        set(ref(DB, 'Schedule/schedule3'), 0);

        set(ref(DB, 'Schedule/countSchedule1'), 0);
        set(ref(DB, 'Schedule/countSchedule2'), 0);
        set(ref(DB, 'Schedule/countSchedule3'), 0);


    }

    useEffect(() => {

        const schedule1Ref = ref(DB, 'Schedule/schedule1');
        const schedule2Ref = ref(DB, 'Schedule/schedule2');
        const schedule3Ref = ref(DB, 'Schedule/schedule3');

        onValue(schedule1Ref, (snapshot) => {
            const data = snapshot.val();
            setSchedule1(data);
            document.getElementById('schedule1').value = data;
        });
        onValue(schedule2Ref, (snapshot) => {
            const data = snapshot.val();
            setSchedule2(data);
            document.getElementById('schedule2').value = data;
        });
        onValue(schedule3Ref, (snapshot) => {
            const data = snapshot.val();
            setSchedule3(data);
            document.getElementById('schedule3').value = data;
        });

        const countSchedule1Ref = ref(DB, 'Schedule/countSchedule1');
        const countSchedule2Ref = ref(DB, 'Schedule/countSchedule2');
        const countSchedule3Ref = ref(DB, 'Schedule/countSchedule3');

        onValue(countSchedule1Ref, (snapshot) => {
            const data = snapshot.val();
            setCountSchedule1(data);
        });
        onValue(countSchedule2Ref, (snapshot) => {
            const data = snapshot.val();
            setCountSchedule2(data);
        });
        onValue(countSchedule3Ref, (snapshot) => {
            const data = snapshot.val();
            setCountSchedule3(data);
        });

        const checkFeedSchedule = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();
            let schedule1var = 0;
            let schedule2var = 0;
            let schedule3var = 0;

            console.log(hour);

            const schedule1varref = ref(DB, 'Schedule/schedule1');
            const schedule2varref = ref(DB, 'Schedule/schedule2');
            const schedule3varref = ref(DB, 'Schedule/schedule3');

            onValue(schedule1varref, (snapshot) => {
                schedule1var = snapshot.val();
                console.log(schedule1var);
            });
            onValue(schedule2varref, (snapshot) => {
                schedule2var = snapshot.val();
                console.log(schedule2var);
            });
            onValue(schedule3varref, (snapshot) => {
                schedule3var = snapshot.val();
                console.log(schedule3var);
            });


            console.log(schedule1var + ' ' + schedule2var + ' ' + schedule3var);

            if (hour < 6 || hour > 22) {
                handleReset();
                props.handleModeChange(0);
            } else if ((hour == schedule1var) && (countSchedule1 === 0)) {
                props.handleModeChange(1);
                console.log("Schedule 1");
                setCountSchedule1(1);
                setSchedule1(0);
                set(ref(DB, 'Schedule/schedule1'), 0);	
                set(ref(DB, 'Schedule/countSchedule1'), 1);
                document.getElementById('schedule1').value = 0;
            } else if ((hour == schedule2var) && (countSchedule2 < 1)) {
                props.handleModeChange(1);
                console.log("Schedule 2");
                setCountSchedule2(1);
                setSchedule2(0);
                set(ref(DB, 'Schedule/schedule2'), 0);
                set(ref(DB, 'Schedule/countSchedule2'), 1);
                document.getElementById('schedule2').value = 0;
            } else if ((hour == schedule3var) && (countSchedule3 < 1)) {
                props.handleModeChange(1);
                console.log("Schedule 3");
                setCountSchedule3(1);
                setSchedule3(0);
                set(ref(DB, 'Schedule/schedule3'), 0);
                set(ref(DB, 'Schedule/countSchedule3'), 1);
                document.getElementById('schedule3').value = 0;
            }
        }, 6000);

        return () => {
            clearInterval(checkFeedSchedule);
        }

    }, []);


    return (
        <>
            <Container>
                <div className="schedule-outer">
                    <h1 className='scheduler-outer-title'>FeedScheduler</h1>
                    <div className="schedule-content d-block">
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