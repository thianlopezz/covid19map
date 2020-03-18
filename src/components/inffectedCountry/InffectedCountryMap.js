import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Avatar, Chip } from '@material-ui/core';

const FlagPin = ({ urlFlag, cases }) => (
  <Chip avatar={<Avatar src={urlFlag} />} label={`${cases} casos`} />
);

export default function InffectedCountryMap({ inffectedCountries }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={1}
      >
        {inffectedCountries.map(country =>
          country.latlng ? (
            <FlagPin
              key={country.country_name}
              lat={country.latlng[0]}
              lng={country.latlng[1]}
              cases={country.cases}
              urlFlag={country.urlFlag}
            />
          ) : null,
        )}
      </GoogleMapReact>
    </div>
  );
}
