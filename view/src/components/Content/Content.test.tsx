import {shallow, mount, render} from 'enzyme';
import App from '../../App';
import Content from './Content';
import LoadingSpinner from './subcomponents/LoadingSpinner';
import {AppProvider} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import {Page, PostProp, PostAction} from '../../utilities/constants';

describe('Alternating between pages', () => {
  /* let wrapper = mount(
    <AppProvider i18n={en}>
      <App />
    </AppProvider>,
  ); */
  it('Rendered component correctly', () => {
    const wrapper = shallow(<Content currentPage={Page.Discover} />);
    expect(wrapper.contains(<LoadingSpinner />)).toBeTruthy();
  });

  /* it('Should start at the discover page', () => {
    let post: PostProp = {
      id: '1',
      title: 'first post',
      url: '',
      description: 'gaga',
    };

    wrapper.setState({postsList: [post]}); 
    const wrapper = shallow(<Content currentPage={Page.Discover} />);
    expect(wrapper.prop('currentPage')).toBe(Page.Discover); // 'first post').text()).toBe('first post');
    //expect(wrapper.find(Content).prop('currentPage')).toBe(Page.Discover);
  }); */

  it('Render a post with mock data', () => {
    //wrapper.find('#popular-button').simulate('click');
    //expect(wrapper.find(Content).prop('currentPage')).toBe(Page.Popular);
    /*  const mockData = [
      {
        id: '1',
        title: 'first post',
        url: '',
        description: 'gaga',
      },
    ];
    const wrapper = shallow(
      <Content currentPage={Page.Discover} posts={mockData} />,
    );
    console.log(wrapper.text());
    expect(wrapper.text().includes('gaga')).toBeTruthy(); */
  });
});
