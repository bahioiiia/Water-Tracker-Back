import * as authServices from "../services/auth.js";
import { requestResetToken, resetPassword } from '../services/auth.js';

import { generateAuthUrl } from '../utils/googleOAuth2.js';

const setupSession = (res, session) => {
    const { _id, refreshToken, refreshTokenValidUntil } = session;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil
    });
};

export const registerController = async (req, res) => {
    const data = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registerd user",
        data: {
            _id: data._id,
            email: data.email,
            name: data.name,
            createdAt: data.createdAt,
        },
    });
};

export const loginController = async (req, res) => {
    const session = await authServices.login(req.body);

    setupSession(res, session);
    
    res.json({
        status: 200,
        message: "Successfully login user",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshSessionController = async (req, res) => {
    const session = await authServices.refreshUserSession(req.cookies);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refresh session",
        data: { accessToken: session.accessToken, }
    });
};

export const logoutController = async (req, res) => {
    if (req.cookies.sessionId) {
        await authServices.logout(req.cookies.sessionId);
    }
    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email has been successfully sent.',
        status: 200,
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        message: 'Password has been successfully reset.',
        status: 200,
        data: {},
    });
};

export const getGoogleOAuthUrlController = async (req, res) => {
    const url = generateAuthUrl();
    res.json({
        status: 200,
        message: 'Successfully get Google OAuth url!',
        data: { url, },
    });
};

export const loginWithGoogleController = async (req, res) => {
    const session = await authServices.loginOrSignupWithGoogle(req.body.code);
    setupSession(res, session);
    res.json({
        status: 200,
        message: 'Successfully logged with Google!',
        data: { accessToken: session.accessToken, },
    });
};
