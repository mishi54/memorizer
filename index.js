const express = require('express')
const path = require('path');
const fs=require('fs');
const app = express()
const port = 3000
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {

  fs.readdir(`./files`,function(err,files){
    res.render("index" , {files:files})
  })
})

app.post('/create', (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.description ,function(err){
res.redirect('/');
  })
   
  })
app.get(`/file/:filename`, function(req, res){

    fs.readFile(`./files/${req.params.filename}`,"utf-8" , function(err,data){
     res.render("show" , {filename:req.params.filename,filedata:data})
    })
   })
app.get(`/edit/:filename`,function(req, res){

     res.render("edit" , {filename:req.params.filename})
    })

app.post('/edit', function (req, res) {
        const oldPath = `./files/${req.body.prev}`;
        const newPath = `./files/${req.body.new}`;
      
        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            console.error(err);
            return res.send("Error renaming file.");
          }
          res.redirect('/');
        });
      });
      

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
