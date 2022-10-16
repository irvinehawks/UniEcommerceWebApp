import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <Container-fluid>
        <Row>
          <Col className='text-center py-3 footer'>
            About Us
            <p>
              *We are an online technology shopping company that specialises on supplying products 
              electronic gadgets to every corner of the earth. Swift delivery and best customer service 
              is guaranteed.
            </p>
          </Col>
          <Col className='text-center py-3 footer'>
            Contacts
            <p>
              Call us on: +263774811735
              Or email:@BluFlareSoftware.com
            </p>
          </Col>
          <Col className='text-center py-3 footer'>
            Services
            <p>Supply of Laptops and other E gadgets.</p>
            <p>Web apps development.</p>
            <p>Enterprise Software.</p>
          </Col>
        </Row>

        <Row>
          <Col className='text-center py-3 footer'>
            Copyright &copy; BluFlare E-Gadgets, 2022 All Rights Reserved.
          </Col>
        </Row>
      </Container-fluid>
    </footer>
  )
}

export default Footer
