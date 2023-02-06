import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
 

  const getCountries = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      
      if (!res.ok) throw new Error("Something went wrong!")
      const data = await res.json()
      console.log(data)
      setCountries(data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  };

  const getCountryByName = async (countryName) => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if(!res.ok) throw new Error('Searched country data Not found');

        const data = await res.json()
        setCountries(data)

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error.message)
      }
  }
  
  useEffect(() => {
    getCountries();
  }, []);

  return (
    
    <div className="country_wrap">
       <div className="country__info">
         <div className="search">
            <SearchInput onSearch={getCountryByName} />
         </div>
       </div>
      <div className="country__list">
        {isLoading && !error && <h4>Loading........</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <div className="country__card">
              <div className="country__img">
                <img src={country.flags.png} alt="" />
              </div>

              <div className="country__data">
                <h3>{country.name.common}</h3>
                <h6>
                  {" "}
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </h6>
                <h6>Region: {country.region}</h6>
                <h6>Currencies: {Object.values(country.currencies || []).map(({name}) => name).join(", ")}</h6>
                <h6>Capital: {country.capital}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Countries;
