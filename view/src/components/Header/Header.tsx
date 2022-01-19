import {Button} from '@shopify/polaris';
import {
  ExploreOutlined,
  Explore,
  FavoriteOutlined,
  FavoriteBorder,
  WhatshotSharp,
  WhatshotOutlined,
} from '@mui/icons-material';
import './Header.css';
import {Page} from '../../utilities/constants';

interface IHeaderProps {
  currentPage: Page;
  setCurrentPage: (newSelection: Page) => void;
}

function Header(props: IHeaderProps) {
  const {currentPage, setCurrentPage} = props;

  return (
    <div className="Header">
      <div className="InnerHeader">
        <a id="logo" href="/">
          <img src="/logo.png" alt="logo" width="270" height="50" />
        </a>
        <div>
          <Button
            id="discover-button"
            onClick={() => setCurrentPage(Page.Discover)}
            icon={
              currentPage === Page.Discover ? (
                <Explore fontSize="large" color="error" />
              ) : (
                <ExploreOutlined fontSize="large" color="error" />
              )
            }
          />
          <Button
            id="popular-button"
            onClick={() => setCurrentPage(Page.Popular)}
            icon={
              currentPage === Page.Popular ? (
                <WhatshotSharp fontSize="large" color="error" />
              ) : (
                <WhatshotOutlined fontSize="large" color="error" />
              )
            }
          />
          <Button
            id="likes-button"
            onClick={() => setCurrentPage(Page.Favourites)}
            icon={
              currentPage === Page.Favourites ? (
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
