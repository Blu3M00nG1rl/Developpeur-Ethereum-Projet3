import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import useEth from '../../../contexts/EthContext/useEth';
import "./proposals-section.css";
import ProposalsSectionBtns from './ProposalsSectionBtns';
import ProposalsSectionData from './ProposalsSectionData';
import NoticeNoArtifact from '../NoticeNoArtifact';
import NoticeWrongNetwork from "../NoticeWrongNetwork";

function ProposalsSection() {

    const { state } = useEth();

    const proposals_section =
        <>
            <Col lg='12' md='12' className="content">
                <h2>Soumettez votre <span>Proposition</span></h2>
                <p>Quel est le plus grand artiste du 20ème siècle ?</p>
                <ProposalsSectionBtns />
                <ProposalsSectionData />
            </Col>
        </>;

    return <section className="section">
        <Container>
            <Row className='align-items-center'>
                {
                    !state.artifact ? <NoticeNoArtifact /> :
                        !state.contract ? <NoticeWrongNetwork /> :
                            proposals_section
                }
            </Row>
        </Container>
    </section>
};

export default ProposalsSection;