const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//connection to database
connectDB();
//body-parser
app.use(bodyParser.json());
//cors
app.use(cors());

//allowing to pass json data
app.use(express.json({ extented: false }));

//Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
