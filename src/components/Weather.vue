<template>
  <div class="weather">
    Weather widget
    <div v-if="notAvailable">
      Sorry, localized weather forecast is currently not available
    </div>
    <Loading message="Loading..." v-if="loading"></Loading>
    <div v-if="weather && !loading">
      <h3>{{ weather.summary }}</h3>
      <p v-if="!weather.daily">{{ `${weather.temperature} &deg;C` }}</p>
      <WeatherDaily v-if="weather.daily" v-bind:daily="weather.daily" />
      <p class="last-updated">
        Last updated: {{ weather.time | formatTimeRelative }} geleden
      </p>

      <div class="type-switch">
        <router-link to="/">Nu</router-link>
        <router-link to="/daily">Komende week</router-link>
      </div>

      <LocationPicker
        v-bind:location="location"
        @location-change="handleUpdateLocation"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { distanceInWordsToNow } from 'date-fns'
import nl from 'date-fns/locale/nl'

import WeatherDaily from './WeatherDaily'
import LocationPicker from './LocationPicker'

let cache

const getWeatherForecast = async (location, type) => {
  const secret = process.env.VUE_APP_DARKSKY_API_KEY
  const endpoint = `https://api.darksky.net/forecast/${secret}/REPLACE_WITH_LAT,REPLACE_WITH_LON?lang=nl&units=ca&exclude=minutely,hourly,alerts,flags`

  const localForecast = endpoint
    .replace('REPLACE_WITH_LAT', location.latitude)
    .replace('REPLACE_WITH_LON', location.longitude)

  // TODO: Should check whether exists in collection of cache (array filter)
  if (
    cache &&
    (cache.latitude === location.latitude &&
      cache.longitude === location.longitude)
  ) {
    // TODO: Check whether to invalidate cache
    return weatherFormatter(cache, type)
  }

  return axios
    .get(localForecast)
    .then(response => {
      // TODO: Should push to cache for location
      cache = { ...response.data, location }
      return weatherFormatter(response.data, type)
    })
    .catch(error => console.error(error))
}

const weatherFormatter = (weather, type) => {
  if (!type) {
    return {
      summary: weather.currently.summary,
      icon: weather.currently.icon,
      latitude: weather.latitude,
      longitude: weather.longitude,
      temperature: weather.currently.temperature,
      time: weather.currently.time * 1000
    }
  }

  if (type === 'daily') {
    return {
      summary: weather.currently.summary,
      icon: weather.currently.icon,
      latitude: weather.latitude,
      longitude: weather.longitude,
      daily: weather.daily.data.reduce((report, day) => {
        report.push({
          summary: day.summary,
          time: day.time * 1000,
          temperatureHigh: day.temperatureHigh,
          temperatureLow: day.temperatureLow,
          icon: day.icon
        })
        return report
      }, []),
      time: weather.currently.time * 1000
    }
  }
}

export default {
  name: 'Weather',
  data() {
    return {
      weather: null,
      location: null,
      loading: null,
      notAvailable: null
    }
  },
  components: {
    WeatherDaily,
    LocationPicker
  },
  filters: {
    formatTimeRelative(value) {
      if (!value) return ''
      return distanceInWordsToNow(new Date(value), { locale: nl })
    }
  },
  watch: {
    $route(to, from) {
      getWeatherForecast(this.location, this.$route.params.forecastType).then(
        weather => {
          this.weather = weather
          this.loading = false
          return this
        }
      )
    }
  },
  mounted() {
    if ('geolocation' in navigator) {
      this.loading = true
      navigator.geolocation.getCurrentPosition(position => {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        getWeatherForecast(this.location, this.$route.params.forecastType).then(
          weather => {
            this.weather = weather
            this.loading = false
          }
        )
      })
    } else {
      return (this.notAvailable = true)
    }
  },
  methods: {
    handleUpdateLocation(value) {
      this.loading = true
      getWeatherForecast(value, this.$route.params.forecastType).then(
        weather => {
          this.weather = weather
          this.loading = false
        }
      )
    }
  }
}
</script>

<style scoped>
.weather {
  border: 1px solid #333;
}
</style>
