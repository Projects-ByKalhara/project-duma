import { Container } from '@mui/material'
import React from 'react'
import './WarningSection.css'


function WarningSection() {
  return (
    <Container>
        <div className="w-outer" ><p className='warning-msg'> No Warnings For Now</p></div>
    </Container>
  )
}

export default WarningSection