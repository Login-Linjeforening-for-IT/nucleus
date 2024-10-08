/**
 * @format This file tests that the App component renders correctly.
 */

import 'react-native'
import App from '../App'

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('App renders correctly', () => {
    renderer.create(<App />)
})
