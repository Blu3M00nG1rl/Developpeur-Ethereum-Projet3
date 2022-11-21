import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import useEth from '../../../contexts/EthContext/useEth';
import "./results-section.css";
import NoticeNoArtifact from '../NoticeNoArtifact';
import NoticeWrongNetwork from "../NoticeWrongNetwork";
import ResultsSectionBtns from './ResultsSectionBtns';

function ProposalsSection() {

    const { state } = useEth();

    const results_section =
        <>
            <Col lg='12' md='12'>
                <div className="content">
                    <h2>Proposition  <span>Gagnant</span>e</h2>
                    <p>Quel est le plus grand artiste du 20ème siècle ?</p>
                    <ResultsSectionBtns />
                </div>
            </Col>
        </>;

    return <section className="section">
        <Container>
            <Row>
                {
                    !state.artifact ? <NoticeNoArtifact /> :
                        !state.contract ? <NoticeWrongNetwork /> :
                            results_section
                }
            </Row>
        </Container>
    </section>
};

export default ProposalsSection;