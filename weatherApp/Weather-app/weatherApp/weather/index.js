const fs = require("fs");
const http = require("http");
// request ko install kiya hai npm i eequests
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceval = (tempVal, orgval) => {
  let temperature = tempVal.replace("{%tempval%}", orgval.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgval.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgval.main.temp_max);
  temperature = temperature.replace("{%location%}", orgval.name);
  temperature = temperature.replace("{%country%}", orgval.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgval.weather[0].main);
  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/api") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=pune&appid=429f08cb700cfc062b41618bde639cd8"
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk); // object mai creayte kiya
        const objarr = [objdata]; // object ko array mai
        const realTimeData = objarr
          .map((val) => replaceval(homeFile, val))
          .join("");
        res.write(realTimeData);
        console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to error");
        res.end();
      });
  } else {
    res.end("file not found");
  }
});

server.listen(9000, "127.0.0.1");

/* [
  {
    coord: { lon: 73.8553, lat: 18.5196 },
    weather: [ [Object] ],
    base: 'stations',
    main: {
      temp: 297.36,
      feels_like: 298.19,
      temp_min: 297.36,
      temp_max: 297.36,
      pressure: 1004,
      humidity: 90,
      sea_level: 1004,
      grnd_level: 943
    },
    visibility: 10000,
    wind: { speed: 4.3, deg: 250, gust: 11.46 },
    clouds: { all: 100 },
    dt: 1721482401,
    sys: {
      type: 2,
      id: 2091523,
      country: 'IN',
      sunrise: 1721435881,
      sunset: 1721483009
    },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]
end
      sea_level: 1004,
      grnd_level: 943
    },
    visibility: 10000,
    wind: { speed: 4.3, deg: 250, gust: 11.46 },
    clouds: { all: 100 },
    dt: 1721482401,
    sys: {
      type: 2,
      id: 2091523,
      country: 'IN',
      sunrise: 1721435881,
      sunset: 1721483009
    },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]
end
      grnd_level: 943
    },
    visibility: 10000,
    wind: { speed: 4.3, deg: 250, gust: 11.46 },
    clouds: { all: 100 },
    dt: 1721482401,
    sys: {
      type: 2,
      id: 2091523,
      country: 'IN',
      sunrise: 1721435881,
      sunset: 1721483009
    },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]
end
    dt: 1721482401,
    sys: {
      type: 2,
      id: 2091523,
      country: 'IN',
      sunrise: 1721435881,
      sunset: 1721483009
    },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]
end
      type: 2,
      id: 2091523,
      country: 'IN',
      sunrise: 1721435881,
      sunset: 1721483009
    },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]
end
      sunset: 1721483009
    },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]
end
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]
end
    cod: 200
  }
]
end
]
end
[
  {
    coord: { lon: 73.8553, lat: 18.5196 },
    weather: [ [Object] ],
    base: 'stations',
    main: {
      temp: 297.36,
      feels_like: 298.19,
      temp_min: 297.36,
      temp_max: 297.36,
      pressure: 1004,
      humidity: 90,
      sea_level: 1004,
      grnd_level: 943
    },
    visibility: 10000,
    wind: { speed: 4.3, deg: 250, gust: 11.46 },
    clouds: { all: 100 },
    dt: 1721482401,
    sys: {
      type: 2,
      id: 2091523,
      country: 'IN',
      sunrise: 1721435881,
      sunset: 1721483009
    },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
  }
]*/
