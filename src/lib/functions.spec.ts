import 'jest'
import {sortEval, getColorPercentage, getLastColors} from './functions'

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

describe('getLastColors', () => {
  test('Get last colors according to date of evaluation', () => {
    const students = [{
        id:1,
        name:'test1',
        evaluations: [{
            id: 2,
            date: '2018-03-02',
            code: 'red'
          },{
            id: 3,
            date: '2018-01-01',
            code: 'green'
          }
       ]
     },{
       id:2,
       name:'test2',
       evaluations: [{
           id: 4,
           date: '2018-03-02',
           code: 'red'
         },{
           id: 5,
           date: '2018-01-01',
           code: 'green'
         },{
           id:6,
           date: '2018-01-03',
           code: 'yellow'
         }
      ]
    },{
      id:3,
      name:'test3',
      evaluations: [{
          id: 10,
          date: '2018-03-02',
          code: 'red'
        },{
          id: 9,
          date: '2018-05-01',
          code: 'green'
        }
     ]
    }
    ]

  expect(getLastColors(students)).toEqual(['red','red','green'])

  })
})


describe('getColorPercentage', () => {
  test('Get 50 for "red" if half of them are red', () => {
    const colors =['red','red','yellow','green']

  expect(getColorPercentage(colors,'red')).toBe(50)
  })
  
  test('Get around 33.33 for "green" if 1/3 of them are green', () => {
    const colors =['red','red','yellow','green','red','green']

  expect(getColorPercentage(colors,'green')).toBe(33.33)
  })
})
