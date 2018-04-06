export const sortEval = (evaluations) => {
  let ev = evaluations.map(e=>e)
  return ev.sort((a,b)=> {
    if (b.date<a.date)
      return 1
    return -1
  })
}

export const getLastColors = (students) => {
  const colors = students.map(student => {
      const ev = sortEval(student.evaluations)
      if (ev.length>0)
        return ev[ev.length-1].code
      return 'inherit'
    })
  return colors
}

export const getColorPercentage = (colors, color:string) => {
  const p = colors.length===0? 0: colors.filter(c=>c===color).length*100
         /colors.length
  return Math.round(p*100)/100
}

//From now on, take an array of students as arguments
export const filterGreen = (students) => {
  return students.filter(student => {
    const evLength = student.evaluations.length
    return (evLength>0 && student.evaluations[evLength-1].code==='green')
  })
}

export const filterYellow = (students) => {
  return students.filter(student => {
    const evLength = student.evaluations.length
    return (evLength>0 && student.evaluations[evLength-1].code==='yellow')
  })
}

export const filterRedOrNoEvaluation = (students) => {
  return students.filter(student => {
    const evLength = student.evaluations.length
    return ((evLength>0 && student.evaluations[evLength-1].code==='red')||
             evLength===0)
  })
}

export const randomPick = (students) => {
  const random = Math.floor((Math.random() * 100) + 1);
  if (students.length === 0) return null
  let filtered
  let pick
  if (random<=53) {
    filtered = filterRedOrNoEvaluation(students)
    if (filtered.length === 0) {return randomPick(students)}
    pick = Math.floor(Math.random() * filtered.length)
    return filtered[pick]
  }
  if (random>53 && random<=(53+28)) {
    filtered = filterYellow(students)
    if (filtered.length === 0) {return randomPick(students)}
    pick = Math.floor(Math.random() * filtered.length)

    return filtered[pick]
  }
  if (random>(53+28)) {
    filtered = filterGreen(students)
    if (filtered.length === 0) {return randomPick(students)}
    pick = Math.floor(Math.random() * filtered.length)
    return filtered[pick]
  }
}
