import axios from 'axios'

export function fetchGlobalCovidMetrics(callback) {
    axios.get('https://covid19.mathdro.id/api/')
        .then(function (response) {
            // handle success
            let data = response.data
            callback(data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

export function fetchCountries(callback) {
    axios.get('https://covid19.mathdro.id/api/countries')
        .then(function (response) {
            // handle success
            let data = response.data
            callback(data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

export function fetchCountryCovidInformation(url, callback) {
    axios.get(url)
        .then(function (response) {
            // handle success
            let data = response.data
            callback(data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

export function fetchDallasCountyDeaths(callback) {
    axios.get("https://data.cdc.gov/resource/kn79-hsxy.json?county_fips_code=48113")
        .then(function (response) {
            // handle success
            let data = response.data
            callback(data[0])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}