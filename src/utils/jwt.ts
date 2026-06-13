import jwt from 'jsonwebtoken';
import { env } from '../config/env';

/**
 * Sign a new JWT token with the specified payload.
 */
export const signToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

/**
 * Verify a JWT token and return its decoded payload.
 */
export const verifyToken = (token: string): any => {
  return jwt.verify(token, env.JWT_SECRET);
};
