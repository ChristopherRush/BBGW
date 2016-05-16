var mraa = require("mraa");
var request = require('request');

//var C = 4275;

//var air_sensor_pin = new mraa.Aio(0);
//air_sensor_pin.setBit(12);
//var temp_sensor_pin = new mraa.Aio(2);
//temp_sensor_pin.setBit(12);
var light_sensor_pin = new mraa.Aio(0);
light_sensor_pin.setBit(12);

function measure_data() {
    
    // Measure light
    var a = light_sensor_pin.read();
    var light_level = a/4096*100; // Analog input is on 4096 levels
    light_level = light_level.toPrecision(4);
    console.log("Light level: " + light_level + " %");
    
    // Measure temperature
    //var b = temp_sensor_pin.read();
    //console.log(b);
    //var resistance = (4096 - b) * 10000 / b; 
    //console.log(resistance);
    //var temperature = 1 / (Math.log(resistance / 10000) / C + 1 / 298.15) - 273.15;
    
    // Measure Air Quality
    //var c = air_sensor_pin.read();
    //var air = c / 4096 * 100;
    //air = air.toPrecision(2);
    //console.log("Air Quality: " + air + " %");
    //var temperature = (b/4096*5000 - 500) / 10;
    //temperature = temperature.toPrecision(4);
    //console.log("Temperature: " + temperature + " C");
    
     // Send request
    var device_name = 'Chris Rush'; // Change with your own name here
    var dweet_url = 'https://dweet.io/dweet/for/' + device_name + '?light=' + light_level;
    console.log(dweet_url);

    var options = {
      url: dweet_url,
      json: true
    };

    request(options, function (error, response, body) {
      if (error) {console.log(error);}
      console.log(body);
    });
    
}

measure_data();
setInterval(measure_data, 10000);