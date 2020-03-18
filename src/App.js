import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';

import InffectedCountryList from './components/inffectedCountry/InffectedCountryList';
import InffectedCountryMap from './components/inffectedCountry/InffectedCountryMap';

function App() {
  let [inffectedCountries, setinffectedCountries] = useState([]);
  let [updatedAt, setUpdatedAt] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let inffectedCountriesResponse = await fetch(
        'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php',
        {
          headers: {
            'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
            'x-rapidapi-key': 'b977b4931cmshc1242005fd952fep1abf72jsn9013efcf73e7',
          },
        },
      );

      let allCountriesResponse = await fetch('https://restcountries.eu/rest/v2/all');

      let allCountries = [];
      if (allCountriesResponse.ok) {
        allCountries = await allCountriesResponse.json();
      }

      if (inffectedCountriesResponse.ok) {
        let { countries_stat, statistic_taken_at } = await inffectedCountriesResponse.json();
        setinffectedCountries(
          countries_stat.map(stat => {
            let countryFound = allCountries.find(
              country =>
                country.name.toUpperCase().indexOf(stat.country_name.toUpperCase()) != -1 ||
                country.altSpellings.findIndex(
                  alt => alt.toUpperCase().indexOf(stat.country_name.toUpperCase()) != -1,
                ) != -1,
            );
            if (!countryFound) countryFound = {};
            return {
              ...stat,
              urlFlag: countryFound.flag,
              latlng: countryFound.latlng,
            };
          }),
        );

        setUpdatedAt(statistic_taken_at);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid style={{ height: '100vh', overflowY: 'auto' }} lg={6} sm={12} item>
        <InffectedCountryList inffectedCountries={inffectedCountries} updatedAt={updatedAt} />
      </Grid>
      <Grid style={{ height: '100vh' }} lg={6} sm={12} item>
        <InffectedCountryMap inffectedCountries={inffectedCountries} />
      </Grid>
    </Grid>
  );
}

export default App;
