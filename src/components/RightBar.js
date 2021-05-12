import React from "react";
import { Col } from "reactstrap";

import SearchBar from "./SearchBar";
import RightBarSection from "./RightBarSection";

import ExploreSection from "./ExploreSection";
import WtF_Section from "./WtF_Section";
import TopicSection from "./TopicSection";

function RightBar(props) {
  return (
    <Col className="d-none d-lg-block p-2" lg="3">
      <SearchBar />
      <RightBarSection
        title="What's Happening"
        placeholders={WiH_placeholders}
        SectionComponent={ExploreSection}
      />

      <RightBarSection
        title="Topics To Follow"
        placeholders={TtF_placeholders}
        SectionComponent={TopicSection}
      />

      <RightBarSection
        title="Who to Follow"
        placeholders={WtF_placeholders}
        SectionComponent={WtF_Section}
      />
    </Col>
  );
}

const WiH_placeholders = [
  {
    tags: ["tag1", "tag2"],
    title: "Lorem Ipsum",
    tweets: 321,
  },
  {
    tags: ["tag3"],
    title: "Wingardium Leviosa",
    tweets: 32,
  },
  {
    tags: ["tag5", "tag6"],
    title: "Avada Kedavra",
    tweets: 452,
  },
  {
    tags: ["tag7", "tag8", "tag9"],
    title: "Worst ever",
    tweets: 1,
  },
  {
    tags: ["tag1"],
    title: "Bestest ever",
    tweets: 9999,
  },
];

const TtF_placeholders = [
  {
    topic: "Biology",
    genre: "Science",
  },
  {
    topic: "Movie News",
    genre: "News",
  },
  {
    topic: "Celebrities",
    genre: "Entertainment",
  },
  {
    topic: "Viral Tweets",
    genre: "Popular right now",
  },
];

const WtF_placeholders = [
  {
    name: "Famous_person_781",
  },
  {
    name: "Forgotten_friend_02",
  },
  {
    name: "No_Idea_Who_This_Is_9872",
  },
  {
    name: "This_weeks_web_celebrity",
  },
  {
    name: "Friend_of_a_friend_of_a_friend_16",
  },
];

export default RightBar;
