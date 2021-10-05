// Extract vote progress bars
import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";

function evaluteVotePercentage(votes, totalVotes) {
  if (totalVotes === 0) {
    return 0;
  }

  return ((votes / totalVotes) * 100).toFixed(2);
}

function VoteProgress({ choice, votes, totalVotes }) {
  return (
    <Progress
      style={{ height: 30 }}
      barStyle={{ overflow: "visible" }}
      className="mb-3"
      animated
      color="info"
      value={evaluteVotePercentage(votes, totalVotes)}
    >
      <div className="cAbsolute w-100 p-2 cBold text-dark d-flex justify-content-between">
        <span>{choice}</span>
        <span>{evaluteVotePercentage(votes, totalVotes)} %</span>
      </div>
    </Progress>
  );
}

export default VoteProgress;
