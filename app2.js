const express = require("express");
const sql = require("mysql");

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
  let descriptionTable = `CREATE TABLE IF NOT EXISTS description(
                            product_id INT(10),
                            name varchar(250),
                            FOREIGN KEY (product_id) REFERENCES product(product_id) )`;
  let priceTable = `create table if not exists price(
                            product_id int(10),
                            name varchar(250),
                            foreign key (product_id) references product(product_id))`;
  let linkTable = `create table if not exists link(
                            product_id int(10),
                            name varchar(250),
                            foreign key (product_id) references product(product_id))`;
  let imageTable = `create table if not exists image(
                            product_id int(10),
                            name varchar(250),
                            foreign key (product_id) references product(product_id))`;
  creatingConnectionWithmyDB.query(productTable, (err) => {
    if (err) throw err;

    console.log("product table created successfully");

    creatingConnectionWithmyDB.query(descriptionTable, (err) => {
      if (err) throw err;

      console.log("description table created successfully");

      creatingConnectionWithmyDB.query(priceTable, (err) => {
        if (err) throw err;

        console.log("price table created successfully");

        creatingConnectionWithmyDB.query(linkTable, (err) => {
          if (err) throw err;

          console.log("link table created successfully");

          creatingConnectionWithmyDB.query(imageTable, (err) => {
            if (err) throw err;

            console.log("image table created successfully");
            res.send("all 5 tables created successfully");
          });
        });
      });
    });
  });
});

app.use(express.urlencoded({ extended: true }));

app.post("/addProduct", (req, res) => {
  const { product, description, price, link, image } = req.body;

  // Insert into the product table
  let insertForProductTable = `INSERT INTO product(name) VALUES('${product}')`;

  creatingConnectionWithmyDB.query(insertForProductTable, (err, result) => {
    if (err) throw err;
    
    const productId = result.insertId;

    // Insert into the description table
    let insertForDescriptionTable = `INSERT INTO description(product_id, name) VALUES(${productId}, '${description}')`;

    creatingConnectionWithmyDB.query(insertForDescriptionTable, (err) => {
      if (err) throw err;
      console.log('Data inserted into description table');
    });

    // Insert into the price table
    let insertForPriceTable = `INSERT INTO price(product_id, name) VALUES(${productId}, '${price}')`;

    creatingConnectionWithmyDB.query(insertForPriceTable, (err) => {
      if (err) throw err;
      console.log('Data inserted into price table');
    });

    // Insert into the link table
    let insertForLinkTable = `INSERT INTO link(product_id, name) VALUES(${productId}, '${link}')`;

    creatingConnectionWithmyDB.query(insertForLinkTable, (err) => {
      if (err) throw err;
      console.log('Data inserted into link table');
    });

    // Insert into the image table
    let insertForImageTable = `INSERT INTO image(product_id, name) VALUES(${productId}, '${image}')`;

    creatingConnectionWithmyDB.query(insertForImageTable, (err) => {
      if (err) throw err;
      console.log('Data inserted into image table');
    });

    res.send('All data inserted successfully');
  });
});


let port = 2000;
app.listen(port, () => {
  console.log("running on 2000");
});
