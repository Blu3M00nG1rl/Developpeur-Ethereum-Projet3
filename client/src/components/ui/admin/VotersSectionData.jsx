import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"
import { Table } from 'reactstrap';

function VotersSectionData() {
    const [oldEvents, setOldEvents] = useState([]);

    const { state: { contract } } = useEth();

    useEffect(() => {
        (async function () {

            let oldEvents = await contract.getPastEvents('VoterRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            })
            let oldies = [];
            oldEvents.forEach(event => {
                oldies.push(event.returnValues.voterAddress);
            });
            setOldEvents(oldies);
        })();

    }, [contract])

    return (
        <>
            <div className="content_data">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Liste des Voteurs Autorisés</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oldEvents.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        </>
    );
};

export default VotersSectionData;