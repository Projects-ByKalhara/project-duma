import React from 'react'
import { Container } from 'react-bootstrap'
import './FeedSection.css'
import { ToggleButton } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';

function FeedSection() {
  const [checkedFeed, setCheckedFeed] = useState(false);

  useEffect(() => {
    const feedRef = ref(DB, 'Feed/feedMotor');
    onValue(feedRef, (snapshot) => {
      const data = snapshot.val();
      setCheckedFeed(data);
    });

  }, []);

  const handleChangeFeed = () => {
    setCheckedFeed(!checkedFeed);
    set(ref(DB, 'Feed/feedMotor'), !checkedFeed);
  };

  return (
    <Container>
      <div className="f-outer">
        <ToggleButton
          className="col-md-5 w-100 feed-btn d-inline-flex align-items-center justify-content-center "
          id="checkFeed"
          type="checkbox"
          variant="outline-primary"
          checked={checkedFeed}
          value="2"
          onChange={handleChangeFeed}
        >
          {checkedFeed ? 'Stop Feeding' : 'Start Feeding'}
        </ToggleButton>
      </div>
    </Container>
  )
}

export default FeedSection