import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import LoginScreen from '../src/screen/LoginScreen';

describe('LoginScreen', () => {
    
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render Google login button and make it clickable', () => {
    const { getByText } = render(<LoginScreen />);
    const googleButton = getByText('Sign in with Google');

    expect(googleButton).toBeTruthy();
    fireEvent.press(googleButton);
  });

  it('should render Facebook login button and make it clickable', () => {
    const { getByText } = render(<LoginScreen />);
    const facebookButton = getByText('Sign in with Facebook');

    expect(facebookButton).toBeTruthy();
    fireEvent.press(facebookButton);
  });

});