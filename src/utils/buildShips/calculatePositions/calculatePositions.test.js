import { horizontalOrientation, verticalOrientation } from "../../constants/orientation"
import { calculatePositions } from "./calculatePositions"

describe('tests in calculatePositions', () => {
    const typeShipSize4 = {
        size: 4,
        count: 1,
        color: 'black',
    }

    test('should return count position equal to size type ship', () => {
        let positions = calculatePositions(typeShipSize4, 1, 2, horizontalOrientation)

        expect(positions.length).toEqual(typeShipSize4.size)

        const typeShipSize2 = {
            size: 2,
            count: 1,
            color: 'black',
        }

        positions = calculatePositions(typeShipSize2, 1, 2, horizontalOrientation)

        expect(positions.length).toEqual(typeShipSize2.size)
    })

    test('should increment column position and the row position should be the same in all position when the orientation is horizontal', () => {
        const positions = calculatePositions(typeShipSize4, 1, 2, horizontalOrientation)

        let previousRow
        let previousColumn

        positions.forEach((position, index) => {
            if (index > 0) {
                expect(position.row).toEqual(previousRow)
                expect(position.column).toEqual(previousColumn + 1)
            }

            previousRow = position.row
            previousColumn = position.column
        })
    })

    test('should increment row position and the column position should be the same in all position when the orientation is vertical', () => {
        const positions = calculatePositions(typeShipSize4, 1, 2, verticalOrientation)

        let previousRow
        let previousColumn

        positions.forEach((position, index) => {
            if (index > 0) {
                expect(position.row).toEqual(previousRow + 1)
                expect(position.column).toEqual(previousColumn)
            }

            previousRow = position.row
            previousColumn = position.column
        })
    })
})
