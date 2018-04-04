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
      return '0'
    })
    .filter(e=>(e!=='0'))
  return colors
}

export const getColorPercentage = (colors, color:string) => {
  const p = colors.filter(c=>c===color).length*100
         /colors.length
  return Math.round(p*100)/100
}
