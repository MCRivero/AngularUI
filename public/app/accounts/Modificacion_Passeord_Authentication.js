

app.get('/login', function(req, res, next) {
  passport.authenticate("login", function(err, user, info) {
    if (err) { return res.json(err); }
    if (!user) { return res.json({ code: "No user found" }); }   
     return res.json(user);    
  })(req, res, next);
});