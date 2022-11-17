const Voting = artifacts.require("./Voting.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract("Voting", accounts => {
    //Liste des constantes à tester
    const owner = accounts[0];
    const account1 = accounts[1];
    const account2 = accounts[2];
    const proposal1 = 'proposal1';
    const proposal2 = 'proposal2';

    let VotingInstance;

    describe('test addVoter/getVoter', function () {

        beforeEach(async () => {
            VotingInstance = await Voting.new({ from: owner });
            await VotingInstance.addVoter(owner, { from: owner });
            await VotingInstance.addVoter(account1, { from: owner });
        })

        it('should not add voter if not owner', async () => {
            await expectRevert(VotingInstance.addVoter(account2, { from: account1 }), 'caller is not the owner');
        })

        it('should not add voter if voters registration is not open', async () => {
            await VotingInstance.startProposalsRegistering({ from: owner });
            await expectRevert(VotingInstance.addVoter(account1, { from: owner }), 'Voters registration is not open yet');
        })

        it('should not add voter if voter is already registered', async () => {
            await expectRevert(VotingInstance.addVoter(owner, { from: owner }), 'Already registered');
        })

        it('should have voter registered', async () => {
            expectEvent(await VotingInstance.addVoter(account2, { from: owner }), 'VoterRegistered', { voterAddress: account2 });
        })

        it('should not get voter data if not voter', async () => {
            await expectRevert(VotingInstance.getVoter(account1, { from: account2 }), "You're not a voter");
        })

        it('should get voter data', async () => {
            const storedVoter = await VotingInstance.getVoter(account1, { from: owner });
            expect(storedVoter.isRegistered).to.be.true;
            expect(storedVoter.hasVoted).to.be.false;
            expect(new BN(storedVoter.votedProposalId)).to.be.bignumber.equal(new BN(0));
        });

    })

    describe('test addProposal/getProposal', function () {

        beforeEach(async () => {
            VotingInstance = await Voting.new({ from: owner });
            await VotingInstance.addVoter(owner, { from: owner });
            await VotingInstance.addVoter(account1, { from: owner });
            await VotingInstance.startProposalsRegistering({ from: owner });
        })

        it('should not submit proposal if not voter', async () => {
            await expectRevert(VotingInstance.addProposal(proposal1, { from: account2 }), "You're not a voter");
        })

        it('should not submit proposal if it is not allowed', async () => {
            await VotingInstance.endProposalsRegistering({ from: owner });
            await expectRevert(VotingInstance.addProposal(proposal1, { from: account1 }), 'Proposals are not allowed yet');
        })

        it('should not submit blank proposal', async () => {
            await expectRevert(VotingInstance.addProposal('', { from: account1 }), 'Vous ne pouvez pas ne rien proposer');
        })

        it('should have proposal registered', async () => {
            expectEvent(await VotingInstance.addProposal(proposal1, { from: account1 }), 'ProposalRegistered', { proposalId: new BN(1) });
        })

        it('should not get proposal data if not voter', async () => {
            await expectRevert(VotingInstance.getOneProposal(1, { from: account2 }), "You're not a voter");
        })

        it('should store proposal in array, get proposal', async () => {
            await VotingInstance.addProposal(proposal1, { from: account1 });
            const storedProposal = await VotingInstance.getOneProposal(1, { from: account1 });
            expect(storedProposal.description).to.be.equal(proposal1);
            expect(new BN(storedProposal.voteCount)).to.be.bignumber.equal(new BN(0));
        })

    })

    describe('test setVote', function () {

        beforeEach(async () => {
            VotingInstance = await Voting.new({ from: owner });
            await VotingInstance.addVoter(owner, { from: owner });
            await VotingInstance.addVoter(account1, { from: owner });
            await VotingInstance.startProposalsRegistering({ from: owner });
            await VotingInstance.addProposal(proposal1, { from: account1 });
            await VotingInstance.addProposal(proposal2, { from: account1 });
            await VotingInstance.endProposalsRegistering({ from: owner });
        })

        it('should not get voter data if not voter', async () => {
            await expectRevert(VotingInstance.setVote(0, { from: account2 }), "You're not a voter");
        })

        it('should not voting if session havent started yet', async () => {
            await expectRevert(VotingInstance.setVote(1, { from: account1 }), 'Voting session havent started yet');
        })

        it('should not voting if have already voted', async () => {
            await VotingInstance.startVotingSession({ from: owner });
            await VotingInstance.setVote(0, { from: account1 });
            await expectRevert(VotingInstance.setVote(0, { from: account1 }), 'You have already voted');
        })

        it('should have not found the proposal', async () => {
            await VotingInstance.startVotingSession({ from: owner });
            await expectRevert(VotingInstance.setVote(5, { from: account1 }), 'Proposal not found');
        })

        it('should get vote id', async () => {
            await VotingInstance.startVotingSession({ from: owner });
            await VotingInstance.setVote(1, { from: account1 });
            const voterData = await VotingInstance.getVoter(account1, { from: owner });
            expect(voterData.isRegistered).to.be.true;
            expect(voterData.hasVoted).to.be.true;
            expect(new BN(voterData.votedProposalId)).to.be.bignumber.equal(new BN(1));

            const proposalData = await VotingInstance.getOneProposal(1, { from: account1 });
            expect(proposalData.description).to.be.equal(proposal1);
            expect(new BN(proposalData.voteCount)).to.be.bignumber.equal(new BN(1));
        })

        it('should have voted', async () => {
            await VotingInstance.startVotingSession({ from: owner });
            expectEvent(await VotingInstance.setVote(1, { from: account1 }), 'Voted', { voter: account1, proposalId: new BN(1) });
        })

    })

    describe('test states : event, revert', function () {

        beforeEach(async () => {
            VotingInstance = await Voting.new({ from: owner });
            await VotingInstance.addVoter(owner, { from: owner });
            await VotingInstance.addVoter(account1, { from: owner });
        })

        //Events
        it("should start proposal registering, get event WorkflowStatusChange", async () => {
            const findEvent = await VotingInstance.startProposalsRegistering({ from: owner });
            expectEvent(findEvent, "WorkflowStatusChange", { previousStatus: new BN(0), newStatus: new BN(1) });
        });

        it("should end proposal registering, get event WorkflowStatusChange", async () => {
            await VotingInstance.startProposalsRegistering({ from: owner });
            const findEvent = await VotingInstance.endProposalsRegistering({ from: owner });
            expectEvent(findEvent, "WorkflowStatusChange", { previousStatus: new BN(1), newStatus: new BN(2) });
        });

        it('should start voting session, get event WorkflowStatusChange', async () => {
            await VotingInstance.startProposalsRegistering({ from: owner });
            await VotingInstance.endProposalsRegistering({ from: owner });
            const findEvent = await VotingInstance.startVotingSession({ from: owner });
            expectEvent(findEvent, "WorkflowStatusChange", { previousStatus: new BN(2), newStatus: new BN(3) });
        })

        it('should end voting session, get event WorkflowStatusChange', async () => {
            await VotingInstance.startProposalsRegistering({ from: owner });
            await VotingInstance.endProposalsRegistering({ from: owner });
            await VotingInstance.startVotingSession({ from: owner });
            const findEvent = await VotingInstance.endVotingSession({ from: owner });
            expectEvent(findEvent, "WorkflowStatusChange", { previousStatus: new BN(3), newStatus: new BN(4) });
        })

        //Reverts
        it('should not start or end proposals and voting if not owner, revert', async () => {
            await expectRevert(VotingInstance.startProposalsRegistering({ from: account2 }), 'caller is not the owner');
            await expectRevert(VotingInstance.endProposalsRegistering({ from: account2 }), 'caller is not the owner');
            await expectRevert(VotingInstance.startVotingSession({ from: account2 }), 'caller is not the owner');
            await expectRevert(VotingInstance.endVotingSession({ from: account2 }), 'caller is not the owner');
        })

        it("should not start proposals registering, revert", async () => {
            await VotingInstance.startProposalsRegistering({ from: owner });
            await VotingInstance.endProposalsRegistering({ from: owner });
            await expectRevert(VotingInstance.startProposalsRegistering({ from: owner }), 'Registering proposals cant be started now');
        });

        it("should not end proposals registering, revert", async () => {
            await expectRevert(VotingInstance.endProposalsRegistering({ from: owner }), 'Registering proposals havent started yet');
        });

        it("should not start voting session, revert", async () => {
            await expectRevert(VotingInstance.startVotingSession({ from: owner }), 'Registering proposals phase is not finished');
        });

        it("should not end voting session, revert", async () => {
            await expectRevert(VotingInstance.endVotingSession({ from: owner }), 'Voting session havent started yet');
        });

    })

    describe('test tallyVotes', function () {

        beforeEach(async () => {
            VotingInstance = await Voting.new({ from: owner });
            await VotingInstance.addVoter(owner, { from: owner });
            await VotingInstance.addVoter(account1, { from: owner });
            await VotingInstance.addVoter(account2, { from: owner });
            await VotingInstance.startProposalsRegistering({ from: owner });
            await VotingInstance.addProposal(proposal1, { from: account1 });
            await VotingInstance.addProposal(proposal2, { from: account2 });
            await VotingInstance.endProposalsRegistering({ from: owner });
            await VotingInstance.startVotingSession({ from: owner });
            await VotingInstance.setVote(1, { from: account1 });
            await VotingInstance.setVote(2, { from: account2 });
            await VotingInstance.setVote(1, { from: owner });
        })

        it('should not tally votes if not owner, revert', async () => {
            await expectRevert(VotingInstance.tallyVotes({ from: account1 }), 'caller is not the owner');
        })

        it("should not tally votes if voting session is not ended, revert", async () => {
            await expectRevert(VotingInstance.tallyVotes({ from: owner }), 'Current status is not voting session ended');
        });

        it('should tally votes, get event WorkflowStatusChange', async () => {
            await VotingInstance.endVotingSession({ from: owner });
            const findEvent = await VotingInstance.tallyVotes({ from: owner });
            expectEvent(findEvent, "WorkflowStatusChange", { previousStatus: new BN(4), newStatus: new BN(5) });
        })

        it('should display the winning proposal description', async () => {
            await VotingInstance.endVotingSession({ from: owner });
            await VotingInstance.tallyVotes({ from: owner });
            const storedWinningProposal = await VotingInstance.winningProposalID.call();
            expect(new BN(storedWinningProposal)).to.be.bignumber.equal(new BN(1));
            const storedProposalDescription = await VotingInstance.getOneProposal(1, { from: account1 });
            expect(storedProposalDescription.description).to.be.equal(proposal1);
            expect(new BN(storedProposalDescription.voteCount)).to.be.bignumber.equal(new BN(2));
        })

    })

})