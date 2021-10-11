// import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'

import { GridSquare } from './GridSquare'

describe('tests in <GridSquare />', () => {
    test('should render <GridSquare /> correctly', () => {
        const wrapper = shallow(
            <GridSquare
                column={1}
                row={1}
                onClick={() => console.log('onClick')}
            />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
