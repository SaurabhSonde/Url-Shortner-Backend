const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connection to database
connectDB();

//allowing to pass json data
app.use(express.json({ extented: false }));

//Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
