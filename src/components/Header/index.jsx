import React, { memo } from "react";

import "./styles.css";

export const Home = memo(() => {
  return (
    <header className="header">
      <h1>The PWA News</h1>
    </header>
  );
});
