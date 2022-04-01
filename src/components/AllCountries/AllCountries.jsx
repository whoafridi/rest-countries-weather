import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../Search/SearchInput";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  console.log(countries);

  return (
    <div className="all__country__wrapper">
      <div className="country__top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
      </div>

      <div className="country__bottom">
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <div className="country__card">
            <div className="country__img">
              <img src={country.flags.png} alt="" />
            </div>

            <div className="country__data">
              <h3>{country.name.common}</h3>
              <h6> Capital: {country.capital}</h6>
              <h6>
                {" "}
                Population: {new Intl.NumberFormat().format(country.population)}
              </h6>
              <h6>Latitude: {country.latlng[0]}</h6>
              <h6>Longitude: {country.latlng[1]}</h6>
              <Button variant="contained" size="small">
                <Link to={`/${country.capital}`}>Weather info</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;
