module.exports = {
	port: process.env.PORT || 8000,
	environment: process.env.NODE_ENV || "development",
	development: {
		db: process.env.DEV_DATABASE_URL,
	},
	production: {
		db: process.env.DATABASE_URL,
	},
};