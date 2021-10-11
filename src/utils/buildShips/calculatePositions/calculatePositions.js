import { verticalOrientation } from "../../constants/orientation"

export const calculatePositions = (typeShip, rowPosition, columnPosition, orientation) => {
    return Array.from({ length: typeShip.size }).map((position, index) => {
        if (orientation === verticalOrientation) {
            return {
                column: columnPosition,
                row: rowPosition + index,
            }
        }

        return {
            column: columnPosition + index,
            row: rowPosition,
        }
    })
}
