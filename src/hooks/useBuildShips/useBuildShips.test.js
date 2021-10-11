import { renderHook } from '@testing-library/react-hooks';
import { useBuildShips } from './useBuildShips';

describe('tests in useBuildShips', () => {
    test('should return 10 ships', async () => {
        const { result } = renderHook(() => useBuildShips())

        const { ships } = result.current

        expect(ships.length).toEqual(10)
    })
})
