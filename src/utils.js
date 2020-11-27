export const filterCases = (data, caseType) => {
  const cutoffDate = new Date('03/01/2020')
  const casesData = data.reduce((result, row) => {
    const date = new Date(row.date)
    if (date < cutoffDate) return result
    const found = result.find((a) => a.country === row.country)
    const value = { x: new Date(row.date), y: row[caseType] }
    if (!found) {
      result.push({ country: row.country, data: [value] })
    } else {
      found.data.push(value)
    }
    return result
  }, [])
  return casesData
}

export const processLogData = (rawData) => {
  const data = rawData.map((rows) => {
    const countryData = rows.data.filter((row) => {
      return row.y !== '0'
    })
    const country = {
      country: rows.country,
      data: countryData,
    }
    return country
  })
  return data
}

export const processCumulativeData = (rawData) => {
  const data = rawData.map((row) => {
    let acc = 0
    const tempData = row.data.map((d) => {
      acc = acc + parseInt(d.y)
      const tempNode = {
        x : d.x,
        y: acc
      }
      return tempNode
    })
    const countryData = {
      country : row.country,
      data: tempData
    }
    return countryData
  })
  return data
}
