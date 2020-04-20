const express =require("express");
const path = require('path')
var bodyParser =require('body-parser');
var request = require('request');
var app=express();
const port=process.env.PORT || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
app.use(express.static(path.join(__dirname,'/public')));


app.post('/search',(req,res)=>{
var encodedaddress= encodeURIComponent(req.body.q);
var data=[];

request({
    url: `https://www.googleapis.com/customsearch/v1?key=AIzaSyBfQle1edAFZYILbwFvkCw25pYtO5WNqoQ&cx=015367489222435087779:lrcjlqwp4bv&q=${encodedaddress}` ,
    json:true 
},(error,response,body)=>{
  // console.log(response);
 var final= {
   'data1' : response.body.items[0].pagemap.hcard,
   'data2':response.body.items[1].snippet,
   'data3': response.body.items[2].snippet
}
  data.push(final);   
})

setTimeout(()=>{
    res.send(data);
},5000);

})
app.listen(port,()=>{
	console.log(`started at  port ${port}`);
});