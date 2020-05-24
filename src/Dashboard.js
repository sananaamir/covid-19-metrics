import React, { useState, useEffect, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardCard from './DashboardCard'
import Grid from '@material-ui/core/Grid'
import CountrySelect from './CountrySelect'
import { fetchCountries, fetchGlobalCovidMetrics, fetchCountryCovidInformation, fetchDallasCountyDeaths } from './api/metrics'

function Dashboard(props) {
    const [didMount, setDidMount] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [confirmedCases, setConfirmedCases] = useState(null)
    const [recoveredCases, setRecoveredCases] = useState(null)
    const [deaths, setDeaths] = useState(null)
    const [isLoadingDallasCounty, setIsLoadingDallasCounty] = useState(false)
    const [dallasCountyDeaths, setDallasCountyDeaths] = useState(null)
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')

    useEffect(() => {
        if (!didMount) {
            setIsLoading(true)
            fetchGlobalCovidMetrics((data) => {
                setConfirmedCases(data.confirmed.value)
                setRecoveredCases(data.recovered.value)
                setDeaths(data.deaths.value)
                setIsLoading(false)
            })

            setIsLoading(true)
            fetchCountries((data) => {
                setCountries(data.countries)
                setIsLoading(false)
            })
            setDidMount(true)

            setIsLoadingDallasCounty(true)
            fetchDallasCountyDeaths((data) => {
                setDallasCountyDeaths(data.covid_death)
                setIsLoadingDallasCounty(false)
            })
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
        fetchCountryCovidInformation(url, (data) => {
            setConfirmedCases(data.confirmed.value)
            setRecoveredCases(data.recovered.value)
            setDeaths(data.deaths.value)
            setIsLoading(false)
        })
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

                {isLoading && <Fragment>
                    <Grid item xs={12} md={4}><DashboardCard metricType="Confirmed Cases" metric="---" color='orange' /></Grid>
                    <Grid item xs={12} md={4}><DashboardCard metricType="Recovered" metric="---" color='green' /></Grid>
                    <Grid item xs={12} md={4}><DashboardCard metricType="Deaths" metric="---" color='red' /></Grid>
                </Fragment>}

                <Grid item xs={false} md={12}></Grid>
                <Grid item xs={false} md={12}></Grid>

                {!isLoadingDallasCounty && <Fragment>
                    <Grid item xs={12} md={12}><h3>Dallas County Metrics</h3> <h5>(Because Dallas is home.)</h5></Grid>
                    <Grid item xs={false} md={4}></Grid>
                    <Grid item xs={12} md={4}><DashboardCard metricType="Dallas County Deaths" metric={dallasCountyDeaths} color='navy' /></Grid>
                    <Grid item xs={false} md={4}></Grid>
                </Fragment>}
            </Grid>
        </div>
    )
}

export default Dashboard