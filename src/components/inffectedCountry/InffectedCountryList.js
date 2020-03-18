import React from 'react';
import { Container, Grid } from '@material-ui/core';

import InffectedCountryCard from './InffectedCountryCard';

export default function InffectedCountryList({ inffectedCountries, updatedAt }) {
  return (
    <Container>
      <h1 style={{ marginBottom: '0' }}>Paises infectados</h1>
      <p style={{ color: '#0e5077', marginTop: '0' }}>actualizado al {updatedAt}</p>
      <Grid spacing={1} container>
        {inffectedCountries.map(country => (
          <Grid key={country.country_name} lg={6} xs={12} sm={12} item>
            <InffectedCountryCard {...country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
