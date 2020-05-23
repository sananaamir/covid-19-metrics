import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardCard from './DashboardCard'
import Grid from '@material-ui/core/Grid'
import CountrySelect from './CountrySelect'

function Dashboard(props) {
    const [didMount, setDidMount] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [confirmedCases, setConfirmedCases] = useState(null)
    const [recoveredCases, setRecoveredCases] = useState(null)
    const [deaths, setDeaths] = useState(null)
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')

    useEffect(() => {
        if (!didMount) {

            setIsLoading(true)
            axios.get('https://covid19.mathdro.id/api/')
                .then(function (response) {
                    // handle success
                    let data = response.data
                    setConfirmedCases(data.confirmed.value)
                    setRecoveredCases(data.recovered.value)
                    setDeaths(data.deaths.value)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

            axios.get('https://covid19.mathdro.id/api/countries')
                .then(function (response) {
                    // handle success
                    let data = response.data
                    setCountries(data.countries)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                    setIsLoading(false)
                });

            setDidMount(true)
        }
    }, [didMount])

    const onChangeCountries = (e) => {
        let countryName = e.target.value
        let url = 'https://covid19.mathdro.id/api/countries/' + countryName
        setSelectedCountry(countryName)

        if (countryName === 'global') {
            url = 'https://covid19.mathdro.id/api/'
            setSelectedCountry('global')
        }

        setIsLoading(true)
        axios.get(url)
            .then(function (response) {
                // handle success
                let data = response.data
                setConfirmedCases(data.confirmed.value)
                setRecoveredCases(data.recovered.value)
                setDeaths(data.deaths.value)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                setIsLoading(false)
            });
    }

    return (
        <div>
            <Grid container spacing={2} justify="center" alignItems="center" style={{ textAlign: 'center' }}>
                <Grid item xs={12}>
                    <h1>COVID-19 Metrics</h1>
                </Grid>

                {isLoading && <Grid item xs={12}><CircularProgress /></Grid>}

                <Grid item xs={false} md={3}></Grid>
                <Grid item xs={12} md={6}>
                    <CountrySelect selectedCountry={selectedCountry} countries={countries} handleChange={onChangeCountries} />
                </Grid>
                <Grid item xs={false} md={3}></Grid>

                <Grid item xs={false} md={12}></Grid>
                <Grid item xs={false} md={12}></Grid>

                {!isLoading && <Fragment>

                    <Grid item xs={12} md={4}><DashboardCard metricType="Confirmed Cases" metric={confirmedCases} color='orange' /></Grid>
                    <Grid item xs={12} md={4}><DashboardCard metricType="Recovered" metric={recoveredCases} color='green' /></Grid>
                    <Grid item xs={12} md={4}><DashboardCard metricType="Deaths" metric={deaths} color='red' /></Grid>
                </Fragment>}
            </Grid>
        </div>
    )
}

export default Dashboard