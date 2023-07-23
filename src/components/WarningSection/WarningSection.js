
import React from 'react'
import './WarningSection.css'
import { Container } from 'react-bootstrap'

function WarningSection() {
  return (
    <Container>
      <div className="warning-outer" >
        <div className="warning-title">
          Warnings
        </div>
        <div className="warning-content">
          * No Warnings For Now
        </div>
      </div>
    </Container>
  )
}

export default WarningSection