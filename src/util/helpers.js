export const guid = () => {
  return Math.random()
    .toString(36)
    .substring(2, 15)
}
