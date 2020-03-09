module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "kanban_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "qjwzfqljetbuse",
    "password": "87f1cfc6826b1473c3555e14428a1ef92aa773bc66891040871fa69c43fceb5f",
    "database": "dammgpoot56j2m",
    "host": "ec2-18-210-51-239.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
