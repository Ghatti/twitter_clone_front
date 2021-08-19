import React, { useState } from "react";
import { Row, Col, Input, Label, Tooltip } from "reactstrap";

import TweetButton from "./TweetButton";

import {
  AddImageIcon,
  AddMediaIcon,
  PollIcon,
  EmoticonIcon,
  CalendarIcon,
} from "./svg/Svg";

//todo extract a UtiliesBar component

function ToolBar({
  tweetText,
  clearForm,
  handleNewTweet,
  attach,
  handleAttach,
}) {
  const [tooltipOpen, setTooltipOpen] = useState({ img: false, gif: false });

  const toggle = (field) => {
    setTooltipOpen({ ...tooltipOpen, [field]: !tooltipOpen[field] });
  };

  function isDisabled(tweetText, attach) {
    if (
      (tweetText.trim().length === 0 || tweetText.trim().length > 280) &&
      attach === ""
    )
      return true;

    return false;
  }

  return (
    <Row className="align-items-center text-info pt-2" noGutters={true}>
      <Col className="d-flex">
        <div className="mr-3">
          <Input
            className="cutitilyBarDisable"
            type="file"
            id="imgAttach"
            name="imgAttach"
            accept="image/png, image/jpeg"
            onChange={handleAttach}
          />
          <Label className="cpointer" id="imgAttachLabel" for="imgAttach">
            <AddImageIcon />
          </Label>
          <Tooltip
            placement="right"
            isOpen={tooltipOpen.img}
            target="imgAttachLabel"
            toggle={() => toggle("img")}
          >
            Image
          </Tooltip>
        </div>

        <div className="mr-3">
          <Input
            className="cutitilyBarDisable"
            type="file"
            id="gifAttach"
            name="gifAttach"
            accept="image/gif"
            onChange={handleAttach}
            disabled={attach ? true : false}
          />
          <Label
            className="cpointer cutitilyBarDisable"
            id="gifAttachLabel"
            for="gifAttach"
          >
            <AddMediaIcon />
          </Label>
          <Tooltip
            placement="right"
            isOpen={tooltipOpen.gif}
            target="gifAttachLabel"
            toggle={() => toggle("gif")}
          >
            GIF
          </Tooltip>
        </div>

        <div className="mr-3">
          <PollIcon />
        </div>

        <div className="mr-3">
          <EmoticonIcon />
        </div>

        <div>
          <CalendarIcon />
        </div>
      </Col>

      <Col className="d-flex justify-content-end mr-3">
        <TweetButton
          disabled={isDisabled(tweetText, attach)}
          handleClick={(evt) => {
            evt.preventDefault();
            handleNewTweet({
              message: tweetText,
              attach: attach,
            });
            clearForm();
          }}
        />
      </Col>
    </Row>
  );
}

export default ToolBar;
