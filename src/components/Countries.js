import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import FilterRegional from "./FilterRegional";
import { Link } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const numOfTotalPages = Math.ceil(countries.length / countriesPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const visibleCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry)

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
  };
  
  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${regionName}`);

      if (!res.ok) throw new Error("Failed..........");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    
    <div className="country_wrap">
       <div className="country__info">
         <div className="search">
            <SearchInput onSearch={getCountryByName} />
         </div>

          <div className="filter">
          <FilterRegional onSelect={getCountryByRegion} />
        </div>
       </div>
      <div className="country__list">
        {isLoading && !error && <h4>Loading........</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {visibleCountries?.map((country) => (
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
     
    <p>
      <span>previous</span>
        {pages.map((page) => (
          <span
           key={page} 
          onClick={() => setCurrentPage(page)}>
          {`${page}  | `}</span>
          ))}
      <span>next</span>
    </p>
      
    </div>
  );
};

export default Countries;
