const express = require('express');
const app = express();

const bodyParser= require('body-parser');





const port = 3000;
//logger middleware

app.use((req,res,next)=>{
	console.log(`${req.method}:${req.url}:${req.ip}:${new Date()}`);
	next();
})

//body parser middleware

app.use(bodyParser.json());


//Data
let products=[{id:1,name:'marker',price:15},{id:2,name:'scale',price:5},{id:3,name:'board',price:150}];


//route handlers

app.get('/',(req,res)=>{
	res.send("<h2>Welcome to products catalog</h2>");

})

app.get('/products',(req,res)=>{
	// res.send({
	// 	msg:'get request made for /products'
	// })
	res.send(products);

})



app.get('/products/:id',(req,res)=>{
	// res.send({
	// 	msg:'get request made for /products'
	// })

	let product = products.find((product)=>{
		return product.id==req.params.id;
	})
	if(product){
		res.send(product);
	}else{
		res.send({
			notice:`product with id ${req.params.id} not found`
		})
	}
	

})




app.post('/products',(req,res)=>{
	// res.send({
	// 	msg:'post request made for /products'
	// })

	//products.push({id:4,name:`${req.params.name}`,price:`${req.params.price}`});

	let product=req.body;
	products.push(req.body);

	res.send({
		product,
		notice:`succefully created`
	});


});

app.put('/products/:id',(req,res)=>{
	// res.send({
	// 	msg:`put request made for /products/${req.params.id}`
	// })
	let product=products.find((product)=>{
		return product.id==req.params.id;
	})

	if(product){
		product.price= req.body.price;
		res.send({
			product,
			notice:'succefully updated the product'
		})
	}else{
		res.send({
			notice:`product with id ${req.params.id} is not found`
		})
	}

})


app.delete('/products/:id',(req,res)=>{
	// res.send({
	// 	msg:`delete request made for /products/${req.params.id}`
	// })
	let index = products.findIndex((product)=>{
		return product.id == req.params.id;
	})

	if(index>=0){
		products.splice(index,1);
		res.send({
			notice:`succefully deleted the product`
		})
	}
	else{
			res.send({
				notice:`product with id ${req.params.id} not found`
			})
	}
})


app.listen(port,()=>{
	console.log('listening on port ',port);
})