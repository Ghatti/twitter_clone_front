import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateLike,
  addRetweet,
  removeRetweet,
  selectTweetContent,
} from "../../store/tweetsSlice";

import { Row, Col } from "reactstrap";

import Attachment from "../Attachment";

import Avatar from "../Avatar";
import InfoBar from "./InfoBar";
import Message from "./Message";
import Poll from "./Poll";
import InteractionBar from "./InteractionBar";
import RetweetBox from "./RetweetBox.js";
import NewTweetModal from "../NewTweetModal";
import AnswerModal from "../AnswerModal";

function Tweet({ tweet, user }) {
  const tweetContent = useSelector((state) =>
    selectTweetContent(state, tweet.content)
  );

  let { retweet } = tweet;
  let retweeted = tweetContent.retweeted_by.includes(user.id);
  let liked = tweetContent.liked_by.includes(user.id);

  const [modal, setModal] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  let dispatch = useDispatch();

  async function handleLike() {
    dispatch(
      updateLike({ id: tweet.id, userId: user.id, like: !liked })
    );
  }

  function handleRetweet() {
    let action = retweeted ? removeRetweet : addRetweet;

    dispatch(action({ tweetId: tweet.id, userId: user.id }));
  }

  const toggleQuote = () => {
    setModal(!modal);
  };

  const toggleAnswer = () => {
    setAnswerModal(!answerModal);
  };

  return (
    <Row noGutters>
      <Col xs="2" md="1">
        <Avatar />
      </Col>
      <Col xs="9" md="10" className="ml-1 ml-md-3">
        <InfoBar username={user.username} created={tweetContent.created_at} />
        <Link to={`/tweet/${tweet.id}`}>
          <Message message={tweetContent.message} />
        </Link>
        <Attachment url={tweetContent.attach} />
        <Poll
          poll={tweetContent.poll}
          pollSettings={tweetContent.pollSettings}
          start={tweetContent.created}
        />
        {retweet ? <RetweetBox retweet={retweet} user={user} /> : null}
        <InteractionBar
          likes={tweetContent.liked_by.length}
          retweets={tweetContent.retweeted_by.length}
          comments={tweetContent.comment_ids.length}
          liked={liked}
          retweeted={retweeted}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          toggleQuote={toggleQuote}
          toggleAnswer={toggleAnswer}
        />
      </Col>
      <NewTweetModal modal={modal} toggleQuote={toggleQuote} quote={tweet} />
      <AnswerModal modal={answerModal} toggle={toggleAnswer} parent={tweet} />
    </Row>
  );
}

export default Tweet;
