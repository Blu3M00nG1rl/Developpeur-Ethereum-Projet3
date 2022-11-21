import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"

function VotingSectionBtns() {
    const { state: { contract, accounts } } = useEth();
    const [inputNumber, setInputNumber] = useState();

    const handleNumberChange = e => {
        setInputNumber(e.target.value);
    };

    const setVote = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputNumber === "") {
            alert("Vous devez choisir quelqu'un avant de voter.");
            return;
        }
        const newVote = inputNumber;
        await contract.methods.setVote(newVote).send({ from: accounts[0] });
    };

    return (
        <div><div>
            <input
                className="input_vote text-center"
                type="text"
                placeholder="N°"
                value={inputNumber}
                onChange={handleNumberChange}
            /></div><div>
                <button className='btn_vote'><i className="ri-checkbox-multiple-line"></i><span onClick={setVote}>Voter</span></button></div>
        </div >
    );
}

export default VotingSectionBtns;