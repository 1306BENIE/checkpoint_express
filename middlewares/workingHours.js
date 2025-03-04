// middlewares.js
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
      next();
  } else {
      res.send('<h1>Le site est fermé ! Revenez entre 9h et 17h, du lundi au vendredi.</h1>');
  }
};

module.exports = { workingHoursMiddleware };
