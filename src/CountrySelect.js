import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function CountrySelect(props) {
    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-country-native-simple">Select A Country</InputLabel>
            <Select
                native
                value={props.selectedCountry}
                onChange={props.handleChange}
                label="Select A Country"
                inputProps={{
                    name: 'country',
                    id: 'outlined-country-native-simple'
                }}
            >
                <option value="global">Global</option>
                {props.countries.map(country => (
                    <option key={country.name} value={country.name}>{country.name}</option>
                ))}
            </Select>
        </FormControl>
    )
}
export default CountrySelect