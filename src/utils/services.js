import axios from 'axios'

const getWeatherForecast = async location => {
  if (!location) {
    throw new Error('No location provided!')
  }

  const secret = process.env.VUE_APP_DARKSKY_API_KEY
  const endpoint = `https://api.darksky.net/forecast/${secret}/REPLACE_WITH_LAT,REPLACE_WITH_LON?lang=nl&units=ca&exclude=minutely,hourly,alerts,flags`

  const localForecast = endpoint
    .replace('REPLACE_WITH_LAT', location.latitude)
    .replace('REPLACE_WITH_LON', location.longitude)

  return axios
    .get(localForecast)
    .then(response => {
      return response.data
    })
    .catch(error => console.error(error))
}

export { getWeatherForecast }
