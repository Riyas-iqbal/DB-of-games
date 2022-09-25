var express = require('express');
var router = express.Router();
var profileHelpers =require('../helpers/profile-helpers')
var userHelpers =require('../helpers/user-helpers')

/* GET Login page. */
router.get('/', function(req, res) {

  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if(req.session.user){
    res.redirect('/home-user')
  }else{

  res.render('login', {"UserloginErr":req.session.UserloginErr})
  req.session.UserloginErr=false
  }
});

/* action for clicking forgot password. */
router.get('/forgotpass', function(req, res) {
  console.log("Accesed Forgot Password Page");
  res.render('forgotpass')
});

router.get('/home-user',(req,res)=>{

  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  let user=req.session.user
  if(user){
  res.render('home-user',{user})
  }else{
  res.redirect('/')
  }
  console.log(user);
})

/*GET Home Page After successful Login */
router.post('/login',(req,res)=>{
  console.log("login Attempted");
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/home-user')
      // res.render('home-user')
    }else{
      req.session.UserloginErr=true
      res.redirect('/')
    }
  })
})


/*GET Signup page for registering as New User.*/
router.get('/signup',(req,res)=>{
  console.log("Accessed Signup Page ");
  res.render('signup')
})

/*Registering new user and redirecting back to login Page */
router.post('/SignupSubmit',(req,res)=>{
  console.log(req.body);
  userHelpers.doSignup(req.body).then(()=>{
    res.redirect('/')
  })

})

/*Registering new user and redirecting back to login Page */
router.post('/create-profile',(req,res)=>{
  console.log("New User-Profile Created");
  console.log(req.body);
  
  profileHelpers.addProfile(req.body).then(()=>{
    // res.render('home-user')
    res.redirect('/')
  })
})


router.get('/logout',(req,res)=>{
  console.log(req.session);
  req.session.user=null
  req.session.loggedIn=false
  res.redirect('/')
})




module.exports = router;
