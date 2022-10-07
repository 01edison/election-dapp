// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

error Election__AlreadyVoted();
error Election_CandidateDoesNotExist();
error Election__CandidateAlreadyExists();

contract Election {
    struct Candidate {
        string name;
        string party;
        uint256 votes;
    }

    uint256 public numCandidates;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(
        string name,
        string party,
        uint256 indexed votes,
        address indexed contractAddress
    );
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

    constructor() {
        // addCandidate("Peter Obi", "Labour Party");
        // addCandidate("Bola Tinubu", "All Progressives Congress");
        // addCandidate("Adewole Adebayo", "Social Democratic Party");
        // addCandidate("Atiku Abubakar", "People's Democratic Party");
        // addCandidate("Dumebi Kachikwu", "African Democratic Congress");
        // addCandidate("Hamza Al-Mustapha", "Action Alliance");
        // addCandidate("Kola Abiola", "Peoples Redemption Party");
        // addCandidate("Malik Ado-Ibrahim", "Young Progressive Party");
        // addCandidate("Omoyele Sowore", "African Action Congress");
        // addCandidate("Peter Umeadi", "All Progressives Grand Alliance");
    }

    function addCandidate(string memory _name, string memory _party) public {
        for (uint i = 0; i < numCandidates; i++) {
            Candidate memory candidate = candidates[i];
            if (
                keccak256(abi.encodePacked(candidate.name)) ==
                keccak256(abi.encodePacked(_name)) ||
                keccak256(abi.encodePacked(candidate.party)) ==
                keccak256(abi.encodePacked(_party))
            ) {
                revert Election__CandidateAlreadyExists();
            }
        }

        candidates[numCandidates] = Candidate(_name, _party, 0);
        numCandidates += 1;
        emit CandidateAdded(_name, _party, 0, address(this));
    }

    function vote(uint256 index) public notVoted {
        if (index > numCandidates - 1) {
            revert Election_CandidateDoesNotExist();
        } else {
            candidates[index].votes += 1; // this actually updates state
            hasVoted[msg.sender] = true;
            Candidate memory candidate = candidates[index]; // this "memory" reads from state
            emit Voted(candidate.name, candidate.party, candidate.votes);
        }
    }
}
