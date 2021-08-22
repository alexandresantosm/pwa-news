import React, { memo, useEffect, useState } from "react";
import { Row, Col } from "antd";

import { getNews } from "../../resources/api";

import { Loading } from "../../components/Loading";
import { Economy } from "../components/Economy";
import { Technology } from "../components/Technology";
import { World } from "../components/World";

export const Home = memo(() => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNews = (articles) => {
    setIsLoading(false);

    setNews({
      economy: articles[0]?.value.value,
      technology: articles[1]?.value.value,
      world: articles[2]?.value.value,
    });
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.allSettled([
      getNews("economy"),
      getNews("technology"),
      getNews("world"),
    ]).then(handleNews);
  }, []);

  const renderLoading = <Loading />;

  const renderNews = (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <h2>World</h2>
          <World values={news?.world} />
        </Col>
        <Col span={24} md={8}>
          <h2>Economy</h2>
          <Economy values={news?.economy} />
        </Col>
      </Row>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2>Technology</h2>
          <Technology values={news?.technology} />
        </Col>
      </Row>
    </>
  );

  return <div>{isLoading ? renderLoading : renderNews}</div>;
});
