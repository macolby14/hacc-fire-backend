"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const CLIENT_HOME_PAGE_URL = `${process.env.CLIENT}:${process.env.CLIENT_PORT}`;
// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: 'user has successfully authenticated',
            user: req.user,
            cookies: req.cookies,
        });
    }
});
// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'user failed to authenticate.',
    });
});
// When logout, redirect to client
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});
// auth with google
router.get('/google', passport_1.default.authenticate('google', { scope: ['openid', 'email', 'profile'] }));
// redirect to home page after successfully login via google
router.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed',
}));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map