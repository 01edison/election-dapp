Moralis.Cloud.afterSave("Voted", async (request) => {
  const logger = Moralis.Cloud.getLogger();

  const candidateName = request.object.get("candidateName");
  const candidateParty = request.object.get("candidateParty");
  const candidateVoteCount = request.object.get("candidateVoteCount");

  const query = new Moralis.Query("CandidateAdded");
  query.equalTo("name", candidateName);
  query.equalTo("party", candidateParty);

  const candidate = await query.first();

  if (candidate) {
    logger.info(`Updating ${candidateName} votes...`);
    candidate.set("votes", candidateVoteCount);
    await candidate.save();
  } else {
    logger.info("Candidate does not exist");
  }
});
