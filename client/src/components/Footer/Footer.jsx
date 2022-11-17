import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import './footer.css';

const Footer = () => {
    return <footer className="footer">
        <Container>
            <Row>
                <Col lg="12" className=' mt-4 text-center'>
                    <p className='copyright'> Copyrights 2022, Developpé par Sophie Constantin. </p>
                </Col>
            </Row>
        </Container>

    </footer>
};

export default Footer;