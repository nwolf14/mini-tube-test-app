const express = require('express');
const passport = require('passport');

const UserController = require('../controllers/UserController');
const CompanyController = require('./../controllers/CompanyController');

const router = express.Router();

require('./../middleware/passport')(passport);

router.post('/users', UserController.create);
router.get('/users', passport.authenticate('jwt', {session: false}), UserController.get);
router.put('/users', passport.authenticate('jwt', {session: false}), UserController.update);
router.delete('/users', passport.authenticate('jwt', {session: false}), UserController.remove);
router.post('/users/login', UserController.login);
router.get('/users/current', passport.authenticate('jwt', {session: false}), UserController.current);

router.post('/companies', passport.authenticate('jwt', {session: false},  CompanyController.create));
router.get('/companies/:company_id', passport.authenticate('jwt', {session: false},  CompanyController.get));
router.put('/companies/:company_id', passport.authenticate('jwt', {session: false},  CompanyController.update));
router.delete('/companies/:company_id', passport.authenticate('jwt', {session: false},  CompanyController.remove));

export default router;