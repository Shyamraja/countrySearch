import React, { useState, useEffect } from "react";


const AllCountries = () => {
   
  const [countries, setCountries] = useState([])
    const [ isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(' ')
 
  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all")
        const data = await res.json()
        console.log(data);
        setCountries(data);
        setIsLoading(false); 

         } 
      catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
  getCountries();
  }, []);

  return (
   <div className= "country__container">
    
    <div className="country_bottom">
        {isLoading && !error && <h4> Loading...</h4>}
        {error && !isLoading && <h4>{error}</h4>}
    {
       countries?.map(country => (
         <div className="country_card">
            <div className="country_img">
               <img src={country.flags.png} alt = "" />
            </div>

             <div className = "country_data">
                <h3>{country.name.common}</h3>
                <h4> Population: {country.population}</h4>
                <h4> Region: {country.region}</h4>
              </div>
          </div>
        ))
    }
    </div>   
   </div> 
  );
}
export default AllCountries;