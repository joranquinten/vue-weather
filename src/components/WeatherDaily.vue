<template>
  <ol>
    <li v-for="day in daily" v-bind:key="day.time">
      <h4>
        {{ day.time | weekDayFromTime | capitalizeFirstLetter }}
        {{ day.time | monthDate }}
      </h4>
      <p>{{ day.summary }}</p>
      <p class="temperature-range">
        {{
          `${day.temperatureLow} &deg;C &ndash; ${day.temperatureHigh} &deg;C`
        }}
      </p>
    </li>
  </ol>
</template>

<script>
import { format } from 'date-fns'
import nl from 'date-fns/locale/nl'

export default {
  name: 'WeatherDaily',
  props: {
    daily: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    capitalizeFirstLetter: function(value) {
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    weekDayFromTime(value) {
      return format(new Date(value), 'dddd', { locale: nl })
    },
    monthDate(value) {
      return format(new Date(value), 'D MMMM', { locale: nl })
    }
  }
}
</script>

<style scoped></style>
