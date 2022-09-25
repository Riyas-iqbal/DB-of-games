var express = require('express');
var router = express.Router();
var profileHelpers =require('../helpers/profile-helpers')

const DBemail = "admin@gmail.com";
const DBpassword = "123";

/* GET . */
router.get('/', function(req, res, next) {

  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  if (req.session.adminLogged) {
    profileHelpers.getAllProfiles().then((allprofiles)=>{
      req.session.admin = allprofiles
      res.render('admin/view-users',{allprofiles}) 
    })
  }else{
    res.render('admin/admin-login',{ loginErr : req.session.loggedErr})
    req.session.loggedErr = null
  }
});

router.post('/', function(req, res) {
  const userDetails = ({ ClientEmail,ClientPassword} = req.body);
  if(ClientEmail == DBemail && ClientPassword == DBpassword){
    req.session.adminLogged = true;
    req.session
    res.redirect('admin/home')
  }else{
      req.session.loggedErr = "Enter Valid Username and Password"
      res.redirect('/admin')
  }
});

router.get('/home',function(req, res) {

  res.header("Cache-Control","no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");

  if (req.session.adminLogged) {
    profileHelpers.getAllProfiles().then((allprofiles)=>{
      console.log(allprofiles);
      res.render('admin/view-users',{allprofiles}) 
    })
  
  }else{
    res.render('admin/admin-login',{ loginErr : req.session.loggedErr})
    req.session.loggedErr = null
  }
});


router.get('/add-profile',function(req, res) {
  res.render('admin/add-profile')
});



router.post('/create-profile-admin',(req,res)=>{
  console.log("New User-Profile Created");
  console.log(req.body);
  profileHelpers.addProfile(req.body).then(()=>{
    res.redirect('/admin/home')
  })
})

router.get('/delete-profile/:id',(req,res)=>{
  console.log("delete");
  // if (req.session.adminLogged) {
    let proId=req.params.id
    profileHelpers.deleteProfile(proId).then((response)=>{
      res.redirect('/admin/home')
    })
})

router.get('/edit-profile/:id',async (req,res)=>{
  let profile=await profileHelpers.getProfileDetails(req.params.id)
  console.log(profile);
  res.render('admin/edit-profile',{profile})
})

router.post('/edit-profile/:id',(req,res)=>{
  profileHelpers.updateProfile(req.params.id,req.body).then(()=>{
    res.redirect('/admin/home')
  })
})


router.get('/admin-logout',function(req, res) {
  req.session.adminLogged=false
  // req.session.ad
  res.redirect('/admin')
});

module.exports = router;
