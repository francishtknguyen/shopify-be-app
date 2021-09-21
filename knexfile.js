const knex = require("knex");
const pg = require("pg");

const { development, production, environment } = require("./config/index");

if (production.db) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

const knexConfig = {
  development: {
    client: "pg",
    migrations: { directory: "./data/migrations" },
    connection: development.db,
  },
  production: {
    client: "pg",
    migrations: { directory: "./data/migrations" },
    connection: production.db,
  },
};

module.exports = knex(knexConfig[environment]);
