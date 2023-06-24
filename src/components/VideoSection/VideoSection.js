import React from 'react'
import { Container } from 'react-bootstrap'
import './VideoSection.css'
import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import DB from '../../Database/Firebase';

function VideoSection() {
  const [image, setImage] = useState('');
  let imageUrl = `data:image/jpeg;base64,${image}`;

  useEffect(() => {
    const imageRef = ref(DB, 'Video/image');
    onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      setImage(data);
    });
  }, []);

  return (
    <Container className="video-container-outer">
      <div className="video-outer">
        <div className="video-title">
          Video
        </div>
        <div className="video-content">
          <img className='video-img' src={imageUrl} alt="Base64 Image" />
        </div>
      </div>
    </Container>
  )
}

export default VideoSection