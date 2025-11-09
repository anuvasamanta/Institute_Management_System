const jwt = require('jsonwebtoken');

const teacherAuthCheck = (req, res, next) => {
  if (req.cookies && req.cookies.teacherToken) {
    jwt.verify(req.cookies.teacherToken, process.env.JWT_SECRET_TEACHER || "hellowelcometowebskittersacademyteacher123456", (err, data) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      req.teacher = data;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Teacher token is required' });
  }
};

module.exports = teacherAuthCheck;
