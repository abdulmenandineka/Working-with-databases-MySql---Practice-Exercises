const express = require("express");
const sql = require("mysql");
let fs = require('fs');

const app = express();

const creatingConnectionWithmyDB = sql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "myDBuser",
  database: "myDB",
});

creatingConnectionWithmyDB.connect((err) => {
  console.log("connected to myDB database");
});

app.get("/install", (req, res) => {
  let productTable = `create table if not exists product(
                            product_id int(10) primary key auto_increment,
                            name varchar(250))`;
  let descriptionTable = `create table if not exists description(
                            product_id INT(10),
                            description varchar(250),
                            foreign key (product_id) REFERENCES product(product_id) )`;
  let priceTable = `create table if not exists price(
                            product_id int(10),
                            price varchar(250),
                            foreign key (product_id) references product(product_id))`;
  let linkTable = `create table if not exists link(
                            product_id int(10),
                            link varchar(250),
                            foreign key (product_id) references product(product_id))`;
  let imageTable = `create table if not exists image(
                            product_id int(10),
                            image varchar(250),
                            foreign key (product_id) references product(product_id))`;
  creatingConnectionWithmyDB.query(productTable, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("product table created successfully");
  });

  creatingConnectionWithmyDB.query(descriptionTable, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("description table created successfully");
  });

  creatingConnectionWithmyDB.query(linkTable, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("link table created successfully");
  });

  creatingConnectionWithmyDB.query(priceTable, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("price table created successfully");
  });

  creatingConnectionWithmyDB.query(imageTable, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("image table created successfully");
    res.send("all 5 tables created successfully");
  });
});
app.use(express.urlencoded({ extended: true }));
app.post('/addProduct',(req,res)=>{
  const {product,description,price,link,image}=req.body;
  const insertDataIntoProductTable = `insert into product(name) values('${product}')`
  creatingConnectionWithmyDB.query(insertDataIntoProductTable,(err,result)=>{
    if(err)res.status(500).send(`<P style = 'color:red;'>error occured while inserting data into <span style = 'font-size:25px;'>product table!!!</span></>`);
    console.log('data inserted into product table');
    const product_id = result.insertId;

    const insertDataIntoDescriptionTable = `insert into description(product_id,description) values('${product_id}','${description}')`
    creatingConnectionWithmyDB.query(insertDataIntoDescriptionTable,(err)=>{
      if(err)res.status(500).send(`<P style = 'color:red;'>error occured while inserting data into <span style = 'font-size:25px;'>description table!!!</span></>`);
      console.log('data inserted into description table');
    })

    const insertDataIntoPriceTable = `insert into price(product_id,price) values('${product_id}','${price}')`
    creatingConnectionWithmyDB.query(insertDataIntoPriceTable,(err)=>{
      if(err)res.status(500).send(`<P style = 'color:red;'>error occured while inserting data into <span style = 'font-size:25px;'>price table!!!</span></>`);
      console.log('data inserted into price table');
    })

    const insertDataIntoLinkTable = `insert into link(product_id,link) values('${product_id}','${link}')`
    creatingConnectionWithmyDB.query(insertDataIntoLinkTable,(err)=>{
      if(err)res.status(500).send(`<P style = 'color:red;'>error occured while inserting data into <span style = 'font-size:25px;'>link table!!!</span></>`);
      console.log('data inserted into link table');
    })
    const insertDataIntoImageTable = `insert into image(product_id,image) values('${product_id}','${image}')`
    creatingConnectionWithmyDB.query(insertDataIntoImageTable,(err)=>{
      if(err)res.status(500).send(`<P style = 'color:red;'>error occured while inserting data into <span style = 'font-size:25px;'>image table!!!</span></>`);
      console.log('data inserted into image table');
      // res.send('<h1>you have successfully inserted data in all tables </h1>')
      fs.readFile('./response.html', 'utf8', (err, data) => {
        if (err) {
          res.status(500).send(`<p style="color:red;">Error occurred while reading the HTML file!</p>`);
          return; // Stop further execution if there's an error reading the file
        }
        res.send(data); // Send the HTML file content
      });
    })
  })
})



let port = 2000;
app.listen(port, () => {
  console.log("running on 2000");
});
