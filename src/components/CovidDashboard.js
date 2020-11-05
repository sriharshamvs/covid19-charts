import { useState, useEffect } from "react";
import { csvParse } from 'd3-dsv'
import LineChartWidget from "./LineChartWidget";

const CovidDashboard = () => {
  const data = fetchCovidData()
  console.log(data)
  return (
    <div>
      <h2>Graphical representation of confirmed cases of COVID-19</h2>
      <LineChartWidget data={data} />
    </div>
  )
}

export default CovidDashboard;

function fetchCovidData() {
  const [data, setData] = useState([])
  const cutoffDate = new Date('03/01/2020')
  console.log(process.env.API_URL)
  useEffect(() => {
      fetch(process.env.API_URL)
              .then((res) => res.text())
              .then(csvParse)
              .then(rows =>
                  rows.reduce((result, row) => {
                      const date = new Date(row.date)
                      if (date < cutoffDate)
                          return result
                      const found = result.find(a => a.country === row.country)
                      const value = {x: new Date(row.date), y: row.new_cases}
                      if (!found) {
                          result.push({country: row.country, data: [value]})
                      } else {
                          found.data.push(value)
                      }
                      return result
                  }, []))
              .then(setData)
  }, [])
    return data
}