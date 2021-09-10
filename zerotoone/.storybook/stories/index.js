// .storybook/stories/global.stories.js
import Vue from 'vue'

import scv from '../../src/components/scv'

Vue.component('scv', scv)

export const comp = () => `
 <scv :title="ubisoft" />
`

export default { title: 'other' }