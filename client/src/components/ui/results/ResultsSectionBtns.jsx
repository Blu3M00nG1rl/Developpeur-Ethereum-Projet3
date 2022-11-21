import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"

function ResultsSectionBtns() {
    const [ResultDesc, setResultDesc] = useState("");

    const { state: { contract, accounts } } = useEth();

    const winningProposalID = async e => {
        let res = await contract.methods.winningProposalID().call({ from: accounts[0] });
        console.log("result_id : " + res);
        let desc = contract.methods.getOneProposal(res).call({ from: accounts[0] });
        desc
            .then((data) => {
                console.log("description : " + data.description);
                setResultDesc(data.description);
            })
            .catch((err) => console.log("erreur : " + err));
    };

    return (
        <>
            <div className="btns d-flex align-items-center gap-4">
                <button className='btn_result d-flex align-items-center gap-2'><i className="ri-medal-2-line"></i><span onClick={winningProposalID}>Afficher le résultat</span></button>
            </div>
            {ResultDesc ? <h2 className="result"><span>{ResultDesc}</span></h2> : ""}
        </>
    );
}

export default ResultsSectionBtns;