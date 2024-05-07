

const { MongoClient } = require("mongodb");
const ObjectId=require('mongodb').ObjectId;

// Replace the uri string with your connection string.
const uri = "mongodb+srv://molsze17:OxtFQHAYis4a000B@bigguy.shgnmtz.mongodb.net/?retryWrites=true&w=majority&appName=bigguy";

async function find_member(n){

    const client = new MongoClient(uri);
    const database=client.db("Gym");

    try{
        const users=database.collection('members');
        const query={firstname: n};
        const user = await users.find(query).toArray();
        return(user);
    }catch(err){
        console.log(err);
        throw(err);
    }
    finally{
        await client.close();
    }
}

async function list_members(){

    const client = new MongoClient(uri);
    const database=client.db("Gym");

    try{
        const users=database.collection('members');
        const user = await users.find().toArray();
        console.log(user);
        return(user);
    }catch(err){
        console.log(err);
        throw(err);
    }
    finally{
        await client.close();
    }
}

async function list_classes(){

    const client=new MongoClient(uri);
    const database=client.db("Gym");

    try{
        const classes=database.collection('classes');
        const cla=await classes.find().toArray();
        return(cla);
    }catch(err){
        console.log(err);
        throw(err);
    }
    finally{
        await client.close();
    }
}

//list_members();

async function create_member(n){

  const client=new MongoClient(uri);
  const database=client.db("Gym");

  try{
    const users=database.collection('members');
    
    const myobj={title:n.title, fname:n.fname, lname:n.lname, email:n.email, pmem:n.pmem};

    await users.insertOne(myobj,function(err,res){
      if(err) throw err;
    });
  }catch(err){
    console.log(err);
    throw(err);
  }finally{
    await client.close();
  }
}

//create_member({title:"mr",fname:"John",lname:"Smith",email:"jsmit@mail.mail",pmem:false});

async function create_class(n){

  const client=new MongoClient(uri);
  const database=client.db("Gym");

  try{
    const cls=database.collection('classes');
    const myobj={classname:n.cname, classday:n.cday,sessionlength:n.slength, price:n.price, currentNmembers:0};
    await cls.insertOne(myobj,function(err,res){
      if(err) throw err;
    });
  }catch(err){
    console.log(err);
    throw(err);
  }finally{
    await client.close();
  }
}


async function link_member(n){
  
  const client=new MongoClient(uri);
  const database=client.db("Gym");

  try{
    const mci=database.collection('member_class');
    const cls=database.collection('classes');
    const myobj={memberID:n.mid, classID:n.cid};
    await mci.insertOne(myobj,function(err,res){
      if(err) throw err;
    });
    await cls.updateOne({_id:n.cid},{$inc:{currentNmembers:1}},function(err,res){
      if(err) throw err;
    });
  }catch(err){
    console.log(err);
    throw(err);
  }finally{
    await client.close();
  }
}


async function update_member(n){

  const client=new MongoClient(uri);
  const database=client.db("Gym");

  try{
    const cls=database.collection('members');
    const newobj={};

    if(n.title){newobj.title=n.title;}
    if(n.email){newobj.email=n.email;}
    if(n.mobile){newobj.mobile=n.mobile;}

    cls.updateOne(query,newobj,function(err,res){
      if(err) throw err;
    });
  }catch(err){
    console.log(err);
    throw(err);
  }finally{
    
    await client.close();
  }

}



module.exports={find_member,list_members,create_member,create_class,link_member};