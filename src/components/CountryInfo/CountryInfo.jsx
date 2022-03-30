import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CountryInfo = () => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { capital } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(
          `http://api.weatherstack.com/current?access_key=5caf3368ebdf626ba51c5bbefd7caa76&query=/${capital}`
        );

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setWeather(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, []);
  console.log(weather);
  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {
        <div className="country__info__container">
          <div className="country__info-img">
            <img src={weather?.current?.weather_icons[0]} alt="" />
          </div>

          <div className="country__info">
            <h1>{weather?.location?.country}</h1>
            <h3>{weather?.location?.name}</h3>

            <div className="country__info-left">
              <h5>
                Temparature: <span>{weather?.current?.temperature}</span>
              </h5>
              <h5>
                Wind Speed: <span>{weather?.current?.wind_speed}</span>
              </h5>
              <h5>
                Precip: <span>{weather?.current?.precip}</span>
              </h5>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default CountryInfo;
