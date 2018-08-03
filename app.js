const express = require('express');
const app = express();


const port = 3000;
//logger middleware

app.use((req,res,next)=>{
	console.log(`${req.method}:${req.url}:${req.ip}:${new Date()}`);
	next();
})

app.get('/',(req,res)=>{
	res.send("<h2>Welcome to products catalog</h2>");

})

app.get('/products',(req,res)=>{
	res.send({
		msg:'get request made for /products'
	})

})

app.post('/products',(req,res)=>{
	res.send({
		msg:'post request made for /products'
	})

})

app.put('/products/:id',(req,res)=>{
	res.send({
		msg:`put request made for /products/${req.params.id}`
	})

})


app.delete('/products/:id',(req,res)=>{
	res.send({
		msg:`delete request made for /products/${req.params.id}`
	})

})

app.listen(port,()=>{
	console.log('listening on port ',port);
})