import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;  // Custom token length

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);  // Use environment variable
      req.email = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.email = decodedData?.sub;
    }

    console.log(`Authenticated user ID: ${req.email}`);  // Add this line

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
