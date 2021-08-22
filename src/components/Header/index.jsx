import React, { memo } from "react";

import "./style.css";

export const Header = memo(() => {
  return (
    <header className="header">
      <h1>The PWA News</h1>
    </header>
  );
});
