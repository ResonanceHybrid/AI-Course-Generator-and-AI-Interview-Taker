/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:VDRBih3dvj4W@ep-round-field-a5ldi18i.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };