import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

import Attachment from "../Attachment";

import Avatar from "../Avatar";
import InfoBar from "./InfoBar";
import Message from "./Message";
import Poll from "./Poll";
import InteractionBar from "./InteractionBar";
import { ACTIONS } from "../../store/actions";

function Tweet(props) {
  let { tweet, user } = props;
  const [liked, setLiked] = useState(false);
  let dispatch = useDispatch();

  function handleLike() {
    let type = liked ? ACTIONS.UNLIKE : ACTIONS.LIKE;
    dispatch({
      type,
      payload: { id: tweet.id },
    });

    setLiked(!liked);
  }

  return (
    <Row className="border p-3" noGutters={true}>
      <Col xs="2" md="1">
        <Avatar />
      </Col>
      <Col className="ml-2 ml-md-3">
        <InfoBar username={user.username} created={tweet.created} />
        <Message message={tweet.message} />
        <Attachment url={tweet.attach} />
        <Poll
          poll={tweet.poll}
          pollSettings={tweet.pollSettings}
          start={tweet.created}
        />
        <InteractionBar
          likes={tweet.likes}
          handleLike={handleLike}
          retweets={tweet.retweets}
          comments={tweet.comments}
        />
      </Col>
    </Row>
  );
}

export default Tweet;
