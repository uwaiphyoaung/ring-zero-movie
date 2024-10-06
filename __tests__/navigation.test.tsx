import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AppNavigation from "../src/navigation/AppNavigation";

const mockStore = configureStore([]);

describe('AppNavigation', () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

  it('Should render MainNavigation if authenticated', () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });

    const { getByText } = render(
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );

    expect(getByText('Movie Explorer')).toBeTruthy();
  });

  it('should render SplashScreen and navigate correctly', async () => {
    const store = mockStore({
        auth: { isAuthenticated: false },
      });
    const { getByText } = render(
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  
    await waitFor(() => expect(getByText(/Movie Explorer/i)).toBeTruthy());
  });

});