import React from "react";
import LikeButton from "./LikeButton.js";
import ShareButton from "./ShareButton.js";
import RetweetButton from "./RetweetButton.js";
import CommentButton from "./CommentButton.js";

function InteractionBar(props) {
  let {
    likes,
    liked,
    retweeted,
    retweets,
    comments,
    handleLike,
    handleRetweet,
    toggleQuote,
    toggleAnswer,
  } = props;

  return (
    <div className="d-flex pt-2 small text-secondary align-item">
      <CommentButton comments={comments} toggle={toggleAnswer} />
      <RetweetButton
        retweeted={retweeted}
        handleRetweet={handleRetweet}
        retweets={retweets}
        toggleQuote={toggleQuote}
      />
      <LikeButton handleLike={handleLike} liked={liked} likes={likes} />
      <ShareButton />
    </div>
  );
}

export default InteractionBar;
