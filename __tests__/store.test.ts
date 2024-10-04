import { store } from "../src/redux/store";

describe('Movies Store', () => {
    it('should create a store without errors', () => {
        expect(store).toBeDefined();
    });
});
