import React, { memo } from "react";
import { Spin, Space } from "antd";

export const Loading = memo(() => {
  return (
    <Space size="middle">
      <Spin size="large" />
    </Space>
  );
});
