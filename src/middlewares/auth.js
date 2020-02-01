export default (req, res, next) => {
  const authheader = req.headers.authorization

  console.log(authheader)

  return next()
}
