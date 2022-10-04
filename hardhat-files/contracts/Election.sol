// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

error Election__AlreadyVoted();
error Election__CandidateAlreadyExists();

contract Election {
    struct Candidate {
        string name;
        string party;
        string state;
        uint256 votes;
    }

    uint256 public numCandidates;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(string name, string party, string state);
    event Voted(
        string candidateName,
        string candidateParty,
        uint256 indexed candidateVoteCount
    );

    modifier notVoted() {
        if (!hasVoted[msg.sender]) {
            _;
        } else {
            revert Election__AlreadyVoted();
        }
    }

    // event Voted(address voter, Candidate);
    function addCandidate(
        string memory _name,
        string memory _party,
        string memory state
    ) public {
        for (uint i = 0; i < numCandidates; i++) {
            Candidate memory candidate = candidates[i];
            if (
                keccak256(abi.encodePacked(candidate.name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                revert Election__CandidateAlreadyExists();
            }
        }

        candidates[numCandidates] = Candidate(_name, _party, state, 0);
        numCandidates += 1;
        emit CandidateAdded(_name, _party, state);
    }

    function vote(uint256 _index) public notVoted {
        candidates[_index].votes += 1; // this actually updates state
        hasVoted[msg.sender] = true;
        Candidate memory candidate = candidates[_index];  // this "memory" reads from state
        emit Voted(candidate.name, candidate.party, candidate.votes);
    }
}
