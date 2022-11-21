import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import useEth from '../../../contexts/EthContext/useEth';
import "./voting-section.css";
import VotingSectionBtns from './VotingSectionBtns';
import VotingSectionData from './VotingSectionData';
import NoticeNoArtifact from '../NoticeNoArtifact';
import NoticeWrongNetwork from "../NoticeWrongNetwork";
import ProposalsSectionData from '../proposals/ProposalsSectionData';

function VotingSection() {

    const { state } = useEth();
    const votes_section =
        <>
            <Col lg='6' md='6'>
                <div className="content">
                    <h2>Liste des <span>Propositions </span></h2>
                    <ProposalsSectionData />
                </div>
            </Col>
            <Col lg='6' md='6'>
                <div className="content">
                    <h2>Soumettez votre <span>Vote</span></h2>
                    <p>Choisissez un numéro parmi la liste des propositions.</p>
                    <VotingSectionBtns />
                    <VotingSectionData />
                </div>
            </Col>
        </>;

    return <section className="section">
        <Container>
            <Row>
                {
                    !state.artifact ? <NoticeNoArtifact /> :
                        !state.contract ? <NoticeWrongNetwork /> :
                            votes_section
                }
            </Row>
        </Container>
    </section>
}

export default VotingSection;