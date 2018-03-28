const jwt = require('jsonwebtoken')

function getJWT (req, res, next) {
  console.log('giving jwt...');
  const data = req.body.response;
  const token = jwt.sign(data, process.env.SECRETKEY)
  req.token = token;
  return next()
}

function authJWT (req, res, next) {
  console.log('authenticating jwt...');
  try {
    console.log('=======JWT SIGN========');
    const decoded = jwt.verify(req.headers.token, process.env.SECRETKEY)
    console.log('=======>>>>>>>>>>>>');
    console.log(decoded);
    req.decoded = decoded;
    return next()
  } catch (err) {
    res.status(401).send(err)
  }
}

function authAdminJWT (req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, process.env.SECRETKEY)
    if (decoded.email == process.env.ADMINEMAIL) {
      return next()
    } else {
      res.status(401).json({
        message: 'You are not admin'
      })
    }
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports = {
  getJWT: getJWT,
  authJWT: authJWT,
  authAdminJWT: authAdminJWT
}
