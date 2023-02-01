import React, { useState, useEffect } from "react";


const AllCountries = () => {
   
  const [countries, setCountries] = useState([])
  
 
  useEffect(() => {
    const getCountries = async () => {
      
        const res = await fetch("https://restcountries.com/v3.1/all")
        const data = await res.json()
        console.log(data);
        setCountries(data);
    
    };
  getCountries();
  }, []);

 
  return (
     <>
       {countries.map(country => (
         
            <div className = "country_data">
                <img src={country.flags.png} />
                <h3>{country.name.common}</h3>
                <h4> Population: {country.population}</h4>
                <h5> Region: {country.region}</h5>
            </div>

        ))}
    </>
    
  );
}
export default AllCountries;