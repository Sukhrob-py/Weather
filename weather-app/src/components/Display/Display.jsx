import { useState } from "react";

import "./display.scss";

const Display = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");

  function onFormSubmit() {
    try {
      let API = "";
      if (city) {
        API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c666356ba51a2a95cb41a10e7743bd97`;
      }

      if (API) {
        const weather = async function (API) {
          const response = await fetch(API);
          const data = await response.json();
          setCity('')
          return data;
          // img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        };
        let datas = weather(API);
        datas.then((data) => setData([data]));
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (data) {
    if (data[0].cod == 200) {
      console.log(data);
      return (
        <div className="container">
          <div className="display">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onFormSubmit();
              }}
            >
              <input
                type="text"
                placeholder="search city ..."
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value.trim());
                }}
              />
              <button>Search</button>
            </form>
            <div className="box">
              <p className="city">City : <span>{data[0].name}</span></p>
              <img
                className="img"
                src={`https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`}
                alt=""
              />
              <h1 className="condition">
                Condition : <span>{data[0].weather[0].description}</span>
              </h1>
              <h1 className="temp">
                Temp (C) :
                <span>{String(data[0].main.temp - 273).substr(0, 5)}</span>
              </h1>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="display">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onFormSubmit();
              }}
            >
              <input
                type="text"
                placeholder="search city ..."
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value.trim());
                }}
              />
              <button>Search</button>
            </form>
            {/* <GetData aa={city} /> */}
            {/* <h1>{data[0].weather[0].description}</h1> */}
            <h1 className="nodata">no data !!!</h1>
            <p className="nodata-p">Please write correct city!</p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="container">
        <div className="display">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFormSubmit();
            }}
          >
            <input
              type="text"
              placeholder="search city ..."
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value.trim());
              }}
            />
            <button>Search</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Display;
