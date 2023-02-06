import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CountryInfo = () => {
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { countryName } = useParams();
   
const getCountryByName = async () => {
       try {
          const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
          if(!res.ok) throw new Error('Country Could Not be found');
          
          const data = await res.json();
          setCountry(data);
          setIsLoading(false);
        } catch (error) {
         setIsLoading(false);
         setError(error.message);
    }
 };
 useEffect(() => {
  getCountryByName();
}, [countryName]);


  return (
  <div className="country_info_wrap">
        <button>
         <Link to="/">Back</Link>
        </button>
      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

    {country?.map((country, index) => ( 
      <div className="country_info_container" key={index}>
        <div className="country_info-img">
          <img src ={country.flags.png} alt="" />
        </div>
        <div className="country_info">
           <div className='country_info-left'>
               <h5> Name: {country.name.common}</h5>
               <h5>
                  {" "}
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </h5>
                <h5>Region: {country.region}</h5>
                <h5>subRegion:{country.subregion}</h5>
                <h5>Languages: {Object.values(country.languages || []).join(", ")}</h5>
                <h5>Currencies: {Object.values(country.currencies || []).map(({name}) => name).join(", ")}</h5>
                <h5>Capital: {country.capital}</h5>
            </div>
        </div>
      </div>
      ))
    }
 </div>
 );
};

export default CountryInfo;