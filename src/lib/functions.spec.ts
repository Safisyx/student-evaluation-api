import 'jest'
import {sortEval} from './functions'
import {Evaluation} from '../students/entities'
describe('sortEval', () => {
  test('Exchange if the first element happend last', () => {

    const evaluations = [{
        id: 2,
        date: '2018-03-02',
        code: 'red'
      },{
        id: 3,
        date: '2018-01-01',
        code: 'green'
      }
   ]

   expect(sortEval(evaluations)).toEqual([evaluations[1],evaluations[0]]);
  })
  test('Not exchange if already ordered by ascending date', () => {

    const evaluations = [{
        id: 2,
        date: '2018-01-02',
        code: 'red'
      },{
        id: 3,
        date: '2018-01-04',
        code: 'green'
      }
   ]
   expect(sortEval(evaluations)).toEqual(evaluations);

  })
})
