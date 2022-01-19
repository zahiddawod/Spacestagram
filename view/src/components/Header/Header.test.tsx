import {shallow} from 'enzyme';
import Header from './Header';
import {Page, PostProp} from '../../utilities/constants';

describe('Header Component Tests', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(
    <Header currentPage={Page.Discover} setCurrentPage={mockFn} />,
  );
  it('Rendered correctly', () => {
    expect(wrapper.is('.Header')).toBe(true);
  });
  it('Clicks buttons', () => {
    wrapper.find('#discover-button').simulate('click');
    wrapper.find('#popular-button').simulate('click');
    wrapper.find('#likes-button').simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});
