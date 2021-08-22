import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Row, Col } from "antd";

import { Actions } from "../components/Actions";
import { Loading } from "../../components/Loading";
import { getNews, getNewsById } from "../../resources/api";
import { createMarkup } from "../../common/utils/createMarkup";

import "./style.css";

export const Post = memo(() => {
  const [news, setNews] = useState([]);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id, subject } = useParams();
  const history = useHistory();

  const handleNews = useCallback((data) => {
    setNews(data[0]?.value);
    setPost(data[1]?.value);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    Promise.allSettled([getNews(subject), getNewsById(subject, id)]).then(
      handleNews
    );
  }, [id, subject, handleNews]);

  const renderImage = (image, description) => (
    <img src={image.url} alt={description} width="75%" />
  );

  const renderDescription = (description) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id) => {
    history.push(`/${subject}/${id}`);
  };

  const renderPostWithSimilarSubject = (post, index) => {
    const { title, image, description, id } = post;

    return (
      <Col span={12} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url
            ? renderImage(image, description)
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  const renderLoading = <Loading />;

  const renderPost = (
    datePublished,
    title,
    image,
    description,
    body,
    renderPostWithSimilarSubject
  ) => (
    <>
      <Link to="/">Back</Link>

      <Actions post={post} subject={subject} />

      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <p>{datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)} />
          {image?.url && renderImage(image, description)}
          <p
            className="text"
            dangerouslySetInnerHTML={createMarkup(description)}
          />
          <hr />
          <p className="text" dangerouslySetInnerHTML={createMarkup(body)} />
        </Col>
        <Col span={24} md={8}>
          <Row gutter={[16, 16]}>
            {news?.value?.map(renderPostWithSimilarSubject)}
          </Row>
        </Col>
      </Row>
    </>
  );

  const { title, image, description, body, datePublished } = post;

  return (
    <>
      {post?.id && (
        <>
          {isLoading
            ? renderLoading
            : renderPost(
                datePublished,
                title,
                image,
                description,
                body,
                renderPostWithSimilarSubject
              )}
        </>
      )}
    </>
  );
});
