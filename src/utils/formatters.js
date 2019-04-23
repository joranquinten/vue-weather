const weatherFormatter = (weather, type) => {
  if (!weather) return undefined
  if (!type || type === 'current') {
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

export { weatherFormatter }
