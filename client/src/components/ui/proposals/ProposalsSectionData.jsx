import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"
import { Table } from 'reactstrap';

function ProposalsSectionData() {
    const [EventText, setEventText] = useState("");
    const [oldEvents, setOldEvents] = useState([]);

    const { state: { contract } } = useEth();

    useEffect(() => {
        (async function () {

            let oldEvents = await contract.getPastEvents('ProposalRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            let oldies = [];
            oldEvents.forEach(event => {
                oldies.push(event.returnValues.proposalText);
            });
            setOldEvents(oldies);

            await contract.events.ProposalRegistered({ fromBlock: "earliest" })
                .on('data', event => {
                    let proposalsevents = event.returnValues.proposalText;
                    setEventText(proposalsevents);
                })
                .on('changed', changed => console.log("changed :" + changed))
                .on('error', err => console.log("error :" + err))
                .on('connected', str => console.log("connected :" + str));

        })();

    }, [contract])

    const eventTextSection =
        <>
            <tr className="nouveau">
                <td>Nouveau</td>
                <td>{EventText}</td>
            </tr>
        </>;

    return (
        <div className="content_data">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Propositions déjà soumises</th>
                    </tr>
                </thead>
                <tbody>
                    {oldEvents.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item}</td>
                        </tr>
                    ))}
                    {
                        EventText === "" ? "" : eventTextSection

                    }

                </tbody>
            </Table>

        </div>

    );
};

export default ProposalsSectionData;