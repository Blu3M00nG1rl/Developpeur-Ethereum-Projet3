import { ButtonGroup, Button } from "reactstrap";
import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth"

function StatutSectionBtns() {
    const { state: { contract, accounts } } = useEth();
    const [active, setActive] = useState("");
    const [callStatus, setCallStatus] = useState();

    const startProposalsRegistering = async () => {
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] })
        window.location.reload();
    };
    const endProposalsRegistering = async () => {
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        window.location.reload();
    };
    const startVotingSession = async () => {
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        window.location.reload();
    };
    const endVotingSession = async () => {
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        window.location.reload();
    };
    const tallyVotes = async () => {
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        window.location.reload();
    };

    useEffect(() => {
        (async function () {
            let stat = contract.methods.workflowStatus().call({ from: accounts[0] });
            stat
                .then((data) => {
                    //console.log(data);
                    setCallStatus(data);
                })
                .catch((err) => console.log("erreur : " + err));
        })();

    }, [contract, accounts])

    return (
        <>
            <ButtonGroup vertical>

                <div onClick={startProposalsRegistering} className="status_btn">
                    <Button
                        active={active === "Debut propositions"}
                        onClick={() => setActive("Debut propositions")}
                    >
                        Debut propositions
                    </Button>
                </div>
                <div onClick={endProposalsRegistering} className="status_btn">
                    <Button
                        active={active === "Cloture propositions"}
                        onClick={() => setActive("Cloture propositions")}
                    >
                        Cloture propositions
                    </Button>
                </div>
                <div onClick={startVotingSession} className="status_btn">
                    <Button
                        active={active === "Début Vote"}
                        onClick={() => setActive("Début Vote")}
                    >
                        Début Vote
                    </Button>
                </div>
                <div onClick={endVotingSession} className="status_btn">
                    <Button
                        active={active === "Cloture Vote"}
                        onClick={() => setActive("Cloture Vote")}
                    >
                        Clôture Vote
                    </Button>
                </div>
                <div onClick={tallyVotes} className="status_btn">
                    <Button
                        active={active === "Résultats"}
                        onClick={() => setActive("Résultats")}
                    >
                        Résultats
                    </Button>
                </div>
            </ButtonGroup>
            <div className="status_data text-center">
                <div >STATUT ACTIF</div>
                {
                    (() => {

                        switch (callStatus) {
                            case "1":
                                return (
                                    <div className="text-center">Propositions activées</div>
                                )
                            case "2":
                                return (
                                    <div className="text-center">Propositions clôturées</div>
                                )
                            case "3":
                                return (
                                    <div className="text-center">Session de vote ouverte</div>
                                )
                            case "4":
                                return (
                                    <div className="text-center">Session de vote fermée</div>
                                )
                            case "5":
                                return (
                                    <div className="text-center">Résultat du vote</div>
                                )
                            default:
                                return (
                                    <div className="text-center">Enregistrement des voteurs</div>
                                )
                        }

                    })()
                }</div>
        </>

    );
}

export default StatutSectionBtns;