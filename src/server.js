require('dotenv').config();

const { db } = require('./database/config');

const app = require('./app');

db.authenticate()
  .then(() => {
    console.log('Database authenticated 👻👻👻');
  })
  .catch((err) => {
    console.log('Error 🥶🥶🥶' + err);
  });

db.sync()
  .then(() => {
    console.log('Database synced 👻👻👻');
  })
  .catch((err) => {
    console.log('Error syncing database 🥶🥶🥶' + err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 👻👻👻`);
});
