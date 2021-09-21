exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
    })
    .createTable("images", (tbl) => {
      tbl.increments("image_id");
      tbl.string("filename").notNullable();
      tbl.string("location").notNullable();
      tbl.string("key").notNullable();
      tbl.string("price");
      tbl.string("description", 256);
      tbl.boolean("public").defaultTo(false);
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

exports.down = async function (knex) {
  // await knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema.dropTableIfExists("users");
};
