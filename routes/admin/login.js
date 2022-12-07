var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuarioModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', { //login.hbs
    layout: 'admin/layout'  //layout.hbs
  });
});

router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario; //captura usuario
    var password = req.body.password; //captura pass

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {

      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
})

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

module.exports = router;
