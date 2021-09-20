const knex = require("knex");
const pg = require("pg");

const { development, production, environment } = require("./index");

if (production.db) {
	pg.defaults.ssl = { rejectUnauthorized: false };
}

const knexConfig = {
	development: {
		client: "pg",
		connection: development.db,
	},
	production: {
		client: "pg",
		connection: production.db,
	},
};

module.exports = knex(knexConfig[environment]);