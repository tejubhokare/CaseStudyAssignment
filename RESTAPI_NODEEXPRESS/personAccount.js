const express = require('express');
const parser=require('body-parser');
const mysql=require('mysql');
const app=express();

// parse application/json data
app.use(parser.json());
 
//create database connection
const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'world'
});
 
con.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected......');
});

//Retrieve All person information 	
app.get('/person',(request,response)=>{
    let sql='select * from person';
    con.query(sql,(err,result)=>{
        if(err)
            throw err;
        else{
            console.log(result);
            response.send(result);
            }
    });
});

//Retrieve a particular person’s detail 
app.get('/person/:id',(request,response)=>{
    let sql='select * from person where id='+request.params.id;
 
    let query=con.query(sql,(err,result)=>{
        if(err)
            throw err;
        response.send(result);
    });
});

//Add new person’s details	
app.post('/person',(request, response)=>{
    let data = {name:request.body.name, address:request.body.address, mobile:request.body.mobile, email:request.body.email, age:request.body.age, dateofbirth:request.body.dateofbirth};
    let sql = 'insert into person SET ?'; //JSON OBJECT FEILD:VALUE
    let query = con.query(sql, data, (err, result)=>{
        if(err)
            throw err;
        else{
            console.log('person details inserted successfully with an id '+result.insertId);
            response.send('person details inserted successfully \n your id is : '+result.insertId);
        }
    });
});

//Edit an existing person detail
app.put('/person/:id', (request, response)=>{
    let sql = 'update person set name=\''+request.body.name+'\',address=\''+request.body.address+'\',mobile=\''+request.body.mobile+'\',email=\''+request.body.email+'\',age=\''+request.body.age+'\',dateofbirth=\''+request.body.dateofbirth+'\' where id='+request.params.id;
    let query = con.query(sql,(err, result)=>{
        if(err)
            throw err;
        else{
            response.send('person details updated successfully....');
        }
    })
});

//Delete a person’s details
app.delete('/person/:id',(request, response)=>{
    let sql = 'delete from person where id='+request.params.id;
    let query = con.query(sql,(err,result)=>{
        if(err)
            throw err;
        response.send('person details removed successfully....');
    });
});

app.listen(3000,()=>{
    
});