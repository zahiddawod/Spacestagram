import {shallow} from 'enzyme';
import Content from './Content';
import {Post} from '../Post/Post';
import LoadingSpinner from './subcomponents/LoadingSpinner';
import {Page, PostProp} from '../../utilities/constants';

describe('Testing Content Component', () => {
  it('Rendered correctly', () => {
    const wrapper = shallow(<Content currentPage={Page.Discover} />);
    expect(wrapper.contains(<LoadingSpinner />)).toBeTruthy();
    expect(wrapper.is('.Content')).toBe(true);
  });

  it('Renders a post', () => {
    const mockData: PostProp[] = [
      {
        id: '1',
        title: 'first post',
        url: '',
        description: 'haha',
      },
    ];
    const wrapper = shallow(
      <Content currentPage={Page.Discover} posts={mockData} />,
    );
    expect(wrapper.find(Post)).toHaveLength(1);
    expect(wrapper.contains(<LoadingSpinner />)).toBeTruthy();
  });

  it('Renders the like page', () => {
    const wrapper = shallow(<Content currentPage={Page.Favourites} />);
    expect(wrapper.text()).toEqual('You have no likes :(');
    expect(wrapper.contains(<LoadingSpinner />)).toBeFalsy();
  });
});
