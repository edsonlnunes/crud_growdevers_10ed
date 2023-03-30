import "dotenv/config";

export default {
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY as string,
  bcryptSalt: Number(process.env.BCRYPT_SALT),
  databaseUrl: process.env.DATABASE_URL as string,
};
