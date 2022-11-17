import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import "./proposals-section.css";

const RegisterSection = () => {
    return <section className="register_section">
        <Container>
            <Row>
                <Col lg='12' md='12'>
                    <div className="register_btns d-flex align-items-center gap-4">
                        <button className='explore_btn d-flex align-items-center gap-2'><i className="ri-rocket-line"></i><Link to="/market">Explorer</Link></button>
                        <button className='create_btn d-flex align-items-center gap-2'><i className="ri-ball-pen-line"></i><Link to="/create">Créer</Link></button>
                    </div>
                    <div className="register_content">
                        <h2>Phrase d'accroche : Découvrez des oeuvres d'art IRL à<span> collectionner et vendre sous forme de NFT</span></h2>
                        <p>Phrase de description : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente quos totam soluta doloribus doloremque architecto natus ut sed modi ea.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default RegisterSection;