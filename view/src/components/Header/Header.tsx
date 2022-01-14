import React from "react";
import { Button } from "@shopify/polaris";
import { ExploreOutlined, FavoriteOutlined } from "@mui/icons-material";
import "./Header.css";

interface Props {
  setSelected: (newSelection: number) => void;
}

function Header(props: Props) {
  const { setSelected } = props;

  return (
    <div className="Header">
      <div className="InnerHeader">
        <a id="logo" href="/">
          <img src="/logo.png" alt="logo" width="270" height="50" />
        </a>
        <div>
          <Button
            id="discover-button"
            onClick={() => setSelected(0)}
            icon={<ExploreOutlined fontSize="large" color="error" />}
          />
          <Button
            id="likes-button"
            onClick={() => setSelected(1)}
            icon={<FavoriteOutlined fontSize="large" color="error" />}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
