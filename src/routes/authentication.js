const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLOggedIn } = require('../lib/auth');

// ruta para renderizar el formulario de registro
router.get('/signup', isNotLOggedIn, (req, res) => {
    res.render('auth/signup');
});
// ruta para recibir los datos de ese formulario
router.post('/signup', isNotLOggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));
// ruta para renderizar el formulario de logueo
router.get('/signin', isNotLOggedIn, (rez, res) => {
    res.render('auth/signin')
});

router.post('/signin', isNotLOggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
          req.logout(function(err) {
               if (err) { return next(err); }
           res.redirect('/signin');
      });
  });

module.exports = router;