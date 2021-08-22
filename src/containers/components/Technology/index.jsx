import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

import { createMarkup } from "../../../common/utils/createMarkup";

export const Technology = memo(({ values }) => {
  const history = useHistory();

  const renderImage = (image, description) => (
    <img src={image.url} alt={description} width="100%" />
  );

  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id) => {
    history.push(`/technology/${id}`);
  };

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;

    return (
      <Col span={24} md={6} key={`technology-post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {renderDescription(description)}
          {image?.url && renderImage(image, description)}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
});

Technology.defaultProps = {
  values: [],
};

Technology.propTypes = {
  values: PropTypes.array.isRequired,
};
