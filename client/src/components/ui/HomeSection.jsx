import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function HomeSection(props) {
    return (
        <section className="section">
            <Container>
                <Row>
                    <Col lg='12' md='12' className="content_home">
                        <h1 className="text-center">
                            <span>Votez </span>pour le plus grand <span>Artiste du 20ème siècle</span>.
                        </h1>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomeSection;