import config from "dotenv";
config();

export default {
    SECRET: 's3cr3tp@ss',
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/apicompany",
}