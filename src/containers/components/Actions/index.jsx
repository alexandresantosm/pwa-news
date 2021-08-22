import React, { memo } from "react";
import PropTypes from "prop-types";

import CopyIcon from "../../../assets/images/copy.svg";
import ShareIcon from "../../../assets/images/share.svg";

import "./style.css";

const navigatorHasShare = navigator.share;

const URL = "http://localhost:3333/api";

export const Actions = memo(({ post, subject }) => {
  const { id, title } = post;

  const shareInfo = () => {
    navigator.share({
      title: `PWA News - Breaking News - ${subject}`,
      text: title,
      url: URL,
    });
  };

  const copyInfo = () => {
    navigator.clipboard.writeText(
      `${title} - *Learn more about in* ${URL}/${subject}/${id}`
    );
  };

  const renderAction = () => {
    const action = navigatorHasShare ? shareInfo : copyInfo;
    const icon = navigatorHasShare ? ShareIcon : CopyIcon;
    const alternativeIconText = navigatorHasShare ? "Share Icon" : "Copy Icon";

    return (
      <img
        className="share-icon"
        src={icon}
        alt={alternativeIconText}
        onClick={action}
      />
    );
  };

  return <div className="share"> {renderAction()}</div>;
});

Actions.defaultProps = {
  post: {},
  subject: "",
};

Actions.propTypes = {
  post: PropTypes.object.isRequired,
  subject: PropTypes.string.isRequired,
};
