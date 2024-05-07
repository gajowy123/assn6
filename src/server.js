const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const {find_by_name,add_to_db,update_user}=require("./db-connect");

app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("static/page.html");
});




app.post("/formsearch", async (req, res) => {
  console.log(req.body);
  const name = await find_by_name(req.body.names);
  console.log(name);
  res.json(name);
});

app.post("/formcreate", async (req, res)=>{
    const data=await add_to_db(req.body);
    res.json({ret:data});
})

app.post("/formupdate", async (req, res)=>{
  const data=await update_user(req.body);
  res.json({ret:data});
})

app.post("/formdelete", async (req, res)=>{
    await delete_from_db(req.body);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

