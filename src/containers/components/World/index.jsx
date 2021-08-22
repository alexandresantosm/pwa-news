import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

import { createMarkup } from "../../../common/utils/createMarkup";

export const World = memo(({ values }) => {
  const history = useHistory();

  const renderImage = (image, description) => (
    <img src={image.url} alt={description} width="100%" />
  );

  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id) => {
    history.push(`/world/${id}`);
  };

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;
    const isFirst = index === 0;
    const spanValue = isFirst ? 24 : 12;

    return (
      <Col span={spanValue} key={`world-post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {renderDescription(description)}
          {isFirst && renderImage(image, description)}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
});

World.defaultProps = {
  values: [],
};

World.propTypes = {
  values: PropTypes.array.isRequired,
};
