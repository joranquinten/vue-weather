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
import { distanceInWordsToNow } from 'date-fns'
import nl from 'date-fns/locale/nl'

import WeatherDaily from './WeatherDaily'
import LocationPicker from './LocationPicker'

import { getWeatherForecast } from '../utils/services'
import { weatherFormatter } from '../utils/formatters'

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
    $route() {
      getWeatherForecast(this.location).then(weather => {
        const formattedWeather = weatherFormatter(
          weather,
          this.$route.params.forecastType
        )

        this.weather = formattedWeather
        this.loading = false
        return this
      })
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

        getWeatherForecast(this.location).then(weather => {
          const formattedWeather = weatherFormatter(
            weather,
            this.$route.params.forecastType
          )

          this.weather = formattedWeather
          this.loading = false
        })
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
