import 'jest'
import {sortEval, getColorPercentage, getLastColors,
        filterGreen, filterRedOrNoEvaluation, randomPick} from './functions'

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

  test('Get 0 for "yellow" is there is no "yellow"', () => {
    const colors=['red','red']

  expect(getColorPercentage(colors,'yellow')).toBe(0)
  })

  test('Get 0 for every color if there is no color', () => {
    const colors=[]

  expect(getColorPercentage(colors,'green')===0 &&
         getColorPercentage(colors,'red')===0 &&
         getColorPercentage(colors,'yellow')===0).toBe(true)
  })
})

describe('filterGreen', () => {
  test('Works if there are green evaluations', () => {

    const students = [{
        id:1,
        name:'test1',
        evaluations: [{
            id: 2,
            date: '2018-03-02',
            code: 'red'
          },{
            id: 3,
            date: '2018-07-01',
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
           date: '2018-06-03',
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

   expect(filterGreen(students).length).toEqual(2)
  })

  test('Works if there are no green evaluations', () => {

    const students = [{
        id:1,
        name:'test1',
        evaluations: [
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
           date: '2018-06-03',
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
          code: 'yellow'
        }
     ]
    }
    ]

   expect(filterGreen(students).length).toEqual(0)
  })
})

describe('filterRedOrNoEvaluation', () => {
  test('Works if there are no evaluations', () => {

    const students = [{
        id:1,
        name:'test1',
        evaluations: [
       ]
     },{
       id:2,
       name:'test2',
       evaluations: [
      ]
    },{
      id:3,
      name:'test3',
      evaluations: [
     ]
    }
    ]

   expect(filterRedOrNoEvaluation(students).length).toEqual(3)
  })

  test('Works if there are reds evaluations', () => {

    const students = [{
        id:1,
        name:'test1',
        evaluations: [
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
           code: 'red'
         },{
           id:6,
           date: '2018-06-03',
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
          code: 'yellow'
        }
     ]
    }
    ]

   expect(filterRedOrNoEvaluation(students).length).toEqual(1)
  })
})

describe('randomPick', () => {
  test('should get value if students is not empty', () => {

    const students = [{
        id:1,
        name:'test1',
        evaluations: [{
            id: 2,
            date: '2018-03-02',
            code: 'red'
          },{
            id: 3,
            date: '2018-07-01',
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
           date: '2018-06-03',
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

   expect(randomPick(students)!==null).toBe(true)
  })

  test('should get value if students is not empty', () => {

    const students = [
      {
          id:1,
          name:'test1',
          evaluations: []
       },{
         id:2,
         name:'test2',
         evaluations: []
      },{
        id:3,
        name:'test3',
        evaluations: []
      }
    ]

   expect(randomPick(students)!==null).toBe(true)
  })

  test('should get value if all evaluations are green', () => {

    const students = [{
        id:1,
        name:'test1',
        evaluations: [{
            id: 2,
            date: '2018-03-02',
            code: 'red'
          },{
            id: 3,
            date: '2018-07-01',
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
           date: '2018-06-03',
           code: 'green'
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

   expect(randomPick(students)!==null).toBe(true)
  })

  test('should get one if no student has been evaluated', () => {

    const students = [

    ]

   expect(randomPick(students)===null).toBe(true)
  })
})
