const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();


app.use("*/CSS", express.static("public/CSS"));
app.use("*/Images", express.static("public/Images"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req,res) {
   
   const location = req.body.cityName;
   const query = location;
   const apiKey = "efec8531e5c54e1a7d4b9a4be1146119";
   const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units= " + unit ;

   https.get(url, function (response) {

     response.on("data", function (data) {
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
       res.write(` <div>
            <h1 style="text-align: center;
            color: lightblue;">The Weather App</h1>
       <div style="background-color: #AFEEEE;
            padding-top: 8%;
            padding-bottom:2%
            
">
    <div style="text-align: center;">
    <h2 style="
                margin: 70px;
                
            ">
     The weather is currently ${weatherDescription}</h2>
    <h1>The temperature in ${location} is ${temp} degree Celcius.</h1>
 
    </div>
    <footer style="position: fixed;
           bottom: 0%;
           left: 45%;
    ">Copyright @ Jayesh Sabale</footer>
</div>
</div>
`);
      //  res.write(`<h1>The temperature in ${location} is ${temp} degree Celcius.</h1>`);
       res.write("<center><img src = " + imageURL + "  /> </center>");
       res.send();
     });
   }); 
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});




