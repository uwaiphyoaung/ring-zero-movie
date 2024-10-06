import { configureGoogleLogin } from '../src/config/SocialLoginConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CLIENT_ID, WEB_CLIENT_ID } from '@env';

test('should call GoogleSignin.configure with the correct parameters', () => {
  configureGoogleLogin();

  expect(GoogleSignin.configure).toHaveBeenCalledWith({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    iosClientId: CLIENT_ID,
  });
});
