import  Sequelize  from 'sequelize'

export const sequelize = new Sequelize('mysql://root:kibo4321@localhost:22/kibodash')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
