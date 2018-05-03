const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');
const upload = multer({ dest: './public/uploads/' });


/* GET home page */
router.get('/', (req, res, next) => {
  Picture.find()
  .then((listOfPictures) =>{
  res.render('index', {pictures: listOfPictures});
  })
  .catch((err)=>{
    console.log(err)
  })
  // res.render('index');
});


router.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});





module.exports = router;
