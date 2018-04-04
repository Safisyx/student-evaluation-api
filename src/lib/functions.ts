export const sortEval = (evaluations) => {
  let ev = evaluations.map(e=>e)
  return ev.sort((a,b)=> {
    if (b.date<a.date)
      return 1
    return -1
  })
}
