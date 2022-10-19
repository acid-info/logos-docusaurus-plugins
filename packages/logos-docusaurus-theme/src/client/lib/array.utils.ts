export const updateArray = <T>(
  arr: T[],
  from: number,
  to: number,
  update: (element: T, index: number) => any,
): T[] => [
  ...arr.slice(0, from),
  ...arr.slice(from, to + 1).map((val, index) => update(val, index + from)),
  ...arr.slice(to + 1),
]
