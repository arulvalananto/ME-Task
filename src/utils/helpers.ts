import * as jose from 'jose';

import constants from './constants';

/**
 * Generate JWT Token for the user.
 * @param data
 * @returns
 */
export const generateToken = async (data: jose.JWTPayload): Promise<string> => {
    const secret = new TextEncoder().encode(constants.JWT_SECRET);

    const jwt = await new jose.SignJWT(data)
        .setProtectedHeader({ alg: constants.JWT_ALG })
        .setExpirationTime(constants.JWT_EXPIRY)
        .sign(secret);

    return jwt;
};

/**
 * Verify JWT Token
 * @param token
 * @returns
 */
export const verifyToken = async (token: string) => {
    const secret = new TextEncoder().encode(constants.JWT_SECRET);
    return await jose.jwtVerify(token, secret);
};

/**
 * Check the email address is valid.
 * @param email
 */
export const isValidEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

/**
 * Check the password is valid.
 * @param password
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
};
