import React from 'react'
import { Container, ToggleButton } from 'react-bootstrap'
import './VideoSection.css'
import { useState, useEffect } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';

function VideoSection() {
  const [image, setImage] = useState('');
  const [checkedVideo, setCheckedVideo] = useState(false);
  let imageUrl = `data:image/jpg;base64,${image}`;
  imageUrl = imageUrl.replace(/[""]/g, '');

  useEffect(() => {
    const imageRef = ref(DB, 'Video/image');
    onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      setImage(data);
    });

    const videoRef = ref(DB, 'Video/videoStatus');
    onValue(videoRef, (snapshot) => {
      const data = snapshot.val();
      setCheckedVideo(data);
    }
    );
  }, []);

  const handleChangeVideo = () => {
    setCheckedVideo(!checkedVideo);
    set(ref(DB, 'Video/videoStatus'), !checkedVideo);
  };

  return (
    <Container className="video-container-outer">
      <div className="video-outer">
        <div className="video-title">
          Video
        </div>
        <div className="video-button">
          <ToggleButton className="col-5 btn" id="checkedVideo" type="checkbox" checkedVideo={checkedVideo} onChange={() => handleChangeVideo()} >
            {checkedVideo ? 'Stop' : 'Start'}
          </ToggleButton>
        </div>
        <div className="video-content">
          <img className='video-img' src={imageUrl} alt="Base64 Image" />
        </div>
      </div>
    </Container>
  )
}

export default VideoSection