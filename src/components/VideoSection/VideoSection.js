import React from 'react'
import { Container, ToggleButton } from 'react-bootstrap'
import './VideoSection.css'
import { useState, useEffect, useRef } from 'react';
import { ref, onValue, set } from "firebase/database";
import DB from '../../Database/Firebase';

import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

function VideoSection(props) {
  const [image, setImage] = useState('');
  const [predictions, setPredictions] = useState([]);
  const imageNewRef = useRef();
  let imageUrl = `data:image/jpg;base64,${image}`;
  imageUrl = imageUrl.replace(/[""]/g, '');

  useEffect(() => {
    const imageRef = ref(DB, 'Video/image');
    onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      setImage(data);
    });

    const imageElement = document.getElementById("#videoimg");

    imageElement.onload = async () => {
      await detectObjectsOnImage(imageElement);
    };

  }, []);

  const normalizePredictions = (predictions, imgSize) => {
    if (!predictions || !imgSize || !imageNewRef) return predictions || [];
    return predictions.map((prediction) => {
      const { bbox } = prediction;
      const oldX = bbox[0];
      const oldY = bbox[1];
      const oldWidth = bbox[2];
      const oldHeight = bbox[3];

      const imgWidth = imageNewRef.current.width;
      const imgHeight = imageNewRef.current.height;

      const x = (oldX * imgWidth) / imgSize.width;
      const y = (oldY * imgHeight) / imgSize.height;
      const width = (oldWidth * imgWidth) / imgSize.width;
      const height = (oldHeight * imgHeight) / imgSize.height;

      return { ...prediction, bbox: [x, y, width, height] };
    });
  };

  const detectObjectsOnImage = async (imageElement, imgSize) => {
    const model = await cocoSsd.load({});
    const predictions = await model.detect(imageElement, 6);
    const normalizedPredictions = normalizePredictions(predictions, imgSize);
    setPredictions(normalizedPredictions);
    try{
      if (predictions[0].class==='dog') {
        set(ref(DB, 'ObjectDetection/dogDetected'), true);
      } else {
        set(ref(DB, 'ObjectDetection/dogDetected'), false);
      }
    }
    catch(err){
      console.log(err);
    }
    console.log(predictions);
  };

  return (
    <Container className="video-container-outer">
      <div className="video-outer">
        <div className="video-title">
          Video
        </div>
        <div className="video-button">
          <ToggleButton className="col-5 btn" id="checkedVideo"
            type="checkbox"
            variant='outline-primary'
            checked={props.currentMode === 3 ? true : false}
            onChange={() => props.handleModeChange(3)} >
            {props.currentMode === 3 ? 'Stop' : 'Start'}
          </ToggleButton>
        </div>
        <div className="video-content">
          <img id='#videoimg' className='video-img' src={imageUrl} alt="Base64 Image" />
        </div>

        <div className="video-details">
          {predictions.map((prediction) => (
            <div key={prediction.class}>
              {((props.currentMode === 3) ? <div className="video-details-class">Detecting ...</div> : <div className="video-details-class">{prediction.class === 'dog' ? "Dog Detected" : "No Dog Detected"}</div>)}
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default VideoSection