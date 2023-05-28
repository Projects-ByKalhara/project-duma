import React from 'react'
import { Container } from 'react-bootstrap'
import './EntertainmentSection.css'
import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';
import { ToggleButton } from 'react-bootstrap'

function EntertainmentSection() {
  const [checkedEntertainment, setCheckedEntertainment] = useState(false);

  useEffect(() => {
    const entertainmentRef = ref(DB, 'Entertainment/entertainmentSystem');
    onValue(entertainmentRef, (snapshot) => {
      const data = snapshot.val();
      setCheckedEntertainment(data);
    });

  }, []);

  const handleChangeEntertainment = () => {
    setCheckedEntertainment(!checkedEntertainment);
    set(ref(DB, 'Entertainment/entertainmentSystem'), !checkedEntertainment);
  };


  return (
    <Container>
      <div className="e-outer">
        <ToggleButton
          className="col-md-12 w-100 h-100 entertainment-btn d-inline-flex align-items-center justify-content-center"
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
    </Container>
  )
}

export default EntertainmentSection