import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import PopularScreen from '../src/screen/PopularScreen';
import { useGetPopularQuery, useGetUpComingQuery } from '../src/redux/services/MovieService';

jest.mock('react-redux', () => ({
    connect: () => jest.fn(),
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
}));

describe('MovieList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Display upcoming movies', async () => {
        // First Page
        (useGetUpComingQuery as jest.Mock).mockReturnValueOnce({
            data: {
                results: [
                    { id: 1, title: 'Upcoming Movie 1', poster_path: '/path1', release_date: '2023-01-01' },
                    { id: 2, title: 'Upcoming Movie 2', poster_path: '/path2', release_date: '2023-01-02' },
                ],
                total_pages: 2
            },
            isLoading: false,
            error: null,
        });

        render(
            <Provider store={store}>
                <PopularScreen />
            </Provider>
        );

        expect(screen.getByText("Upcoming Movie 1")).toBeTruthy();
        expect(screen.getByText("Upcoming Movie 2")).toBeTruthy();

        // Second Page
        (useGetUpComingQuery as jest.Mock).mockReturnValueOnce({
            data: {
                results: [
                    { id: 3, title: 'Upcoming Movie 3', poster_path: '/path3', release_date: '2023-01-03' },
                ],
                total_pages: 2,
            },
            isLoading: false,
            error: null,
        });

        fireEvent.scroll(
            screen.getByTestId('movie-list'),
            {
                target: {
                    contentOffset: { y: 1000 }
                }
            }
        );

        await waitFor(() => {
            expect(screen.getByText('Upcoming Movie 3')).toBeTruthy();
        });
    });

    it('Display popular movies', async () => {
        (useGetPopularQuery as jest.Mock).mockReturnValueOnce({
            data: {
                results: [
                    { id: 1, title: 'Popular Movie 1', poster_path: '/path1', release_date: '2023-01-01' },
                    { id: 2, title: 'Popular Movie 2', poster_path: '/path2', release_date: '2023-01-02' },
                ],
                total_pages: 2,
            },
            isLoading: false,
            error: null
        });

        render(
            <Provider store={store}>
                <PopularScreen />
            </Provider>
        );

        expect(screen.getByText('Popular Movie 1')).toBeTruthy();
        expect(screen.getByText('Popular Movie 2')).toBeTruthy();

        (useGetPopularQuery as jest.Mock).mockReturnValueOnce({
            data: {
                results: [
                    { id: 3, title: 'Popular Movie 3', poster_path: '/path3', release_date: '2023-01-03' },
                ],
                total_pages: 2,
            },
            isLoading: false,
            error: null,
        });

        fireEvent.scroll(
            screen.getByTestId('movie-list'),
            {
                target: {
                    contentOffset: {
                        y: 1000
                    }
                }
            }
        );

        await waitFor(() => {
            expect(screen.getByText("Popular Movie 3")).toBeTruthy();
        });
    });

    it('Upcoming loading state', () => {
        (useGetUpComingQuery as jest.Mock).mockReturnValue({
            isLoading: true,
            data: null,
            error: null,
        });

        render(
            <Provider store={store}>
                <PopularScreen />
            </Provider>
        );

        expect(screen.getByText('Loading')).toBeTruthy();
    });

    it('Upcoming api failure', () => {
        (useGetUpComingQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            data: null,
            error: { message: 'Failed to load' },
        });

        render(
            <Provider store={store}>
                <PopularScreen />
            </Provider>
        );

        expect(screen.getByText('Error')).toBeTruthy();
    });
});