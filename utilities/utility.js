// Helper functions
import dotenv from "dotenv";

dotenv.config();

const getPassscode = () => process.env.SECRET_PASSCODE;

export { getPassscode };
