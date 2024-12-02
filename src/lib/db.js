import mysql from 'mysql2/promise'
import { Sequelize } from 'sequelize';

export async function query(sql, values = []) {
    // if (!query) {
    //     throw new Error('SQL query string is required');
    // }

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    
    try {
        const [results] = await connection.query(sql, values);
        
        return results;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        connection.end();
    }
}
export const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false
    }
  );
  
  const syncDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  syncDatabase();