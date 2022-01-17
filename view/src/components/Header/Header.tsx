import { Button } from "@shopify/polaris";
import {
  ExploreOutlined,
  Explore,
  FavoriteOutlined,
  FavoriteBorder,
  WhatshotSharp,
  WhatshotOutlined
} from "@mui/icons-material";
import "./Header.css";

interface Props {
  selected: number;
  setSelected: (newSelection: number) => void;
}

function Header(props: Props) {
  const { selected, setSelected } = props;

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
            icon={
              selected === 0 ? (
                <Explore fontSize="large" color="error" />
              ) : (
                <ExploreOutlined fontSize="large" color="error" />
              )
            }
          />
          <Button
            id="popular-button"
            onClick={() => setSelected(1)}
            icon={
              selected === 1 ? (
                <WhatshotSharp fontSize="large" color="error" />
              ) : (
                <WhatshotOutlined fontSize="large" color="error" />
              )
            }
          />
          <Button
            id="likes-button"
            onClick={() => setSelected(2)}
            icon={
              selected === 2 ? (
                <FavoriteOutlined fontSize="large" color="error" />
              ) : (
                <FavoriteBorder fontSize="large" color="error" />
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
