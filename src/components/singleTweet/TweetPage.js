import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectTweetById } from "../../store/tweetsSlice";
import { Row } from "reactstrap";

import user from "../../placeholders/user";

import TopBar from "../TopBar";
import SubsetTweetList from "../SubsetTweetList";
import TweetCard from "../feed/TweetCard";
import CommentTweet from "../CommentTweet";
import { selectAnswers } from "../../store/PageSlice";

export default function TweetPage(props) {
  let { id } = useParams();

  let tweet = useSelector((state) => selectTweetById(state, parseInt(id)));

  const tweetList = [...useSelector((state) => selectAnswers(state))].reverse();

  return tweet ? (
    <div>
      <TopBar header="Tweet" />
      {tweet ? <TweetCard tweet={tweet} user={user} /> : null}
      <Row className="border p-3 d-none d-md-flex" noGutters={true}>
        <CommentTweet parent_id={parseInt(id)} />
      </Row>
      <SubsetTweetList user={user} tweetList={tweetList} />
    </div>
  ) : null;
}
