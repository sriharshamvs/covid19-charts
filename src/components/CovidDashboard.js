import { useState } from 'react'
import { processLogData, filterCases } from '../utils'
import { processCumulativeData} from '../utils'
import LineChartWidget from './LineChartWidget'

const LineChart = (props) => {
  const chartProps = props
  if (chartProps.data.data === null) {
    return (
      <div>
        <div className='m-3'>Loading...</div>
      </div>
    )
  } else {
    return (
      <div>
        <LineChartWidget data={chartProps.data} />
      </div>
    )
  }
}

const CovidDashboard = (props) => {
  const newCases = filterCases(props.data, 'new_cases')
  const newDeaths = filterCases(props.data, 'new_deaths')

  const [casesType, setCasesType] = useState('confirmed')
  const [dataType, setDataType] = useState('new')
  const [scaleType, setScaleType] = useState('linear')
  const [datesAdjusted, setDatesAdjusted] = useState('off')

  const propsData = {
    data: null,
    lineLabel: '',
    lineHeading: '',
    casesType,
    dataType,
    scaleType,
    datesAdjusted
  }

  if (casesType === 'confirmed') {
    const initData = dataType === 'cumulative' ? processCumulativeData(newCases) : newCases
    propsData.data = scaleType === 'log' ? processLogData(initData) : initData
    propsData.lineHeading = 'Graphical representation of New Cases of COVID-19'
    propsData.lineLabel = 'New Cases'
  } else if (casesType === 'deaths') {
    const initData = dataType === 'cumulative' ? processCumulativeData(newDeaths) : newDeaths
    propsData.data = scaleType === 'log' ? processLogData(initData) : initData
    propsData.lineHeading = 'Graphical representation of Deaths of COVID-19'
    propsData.lineLabel = 'Deaths'
  }

  const _handleCasesType = (e) => {
    setCasesType(e.currentTarget.value)
  }
  const _handleDataType = (e) => {
    setDataType(e.currentTarget.value)
  }
  const _handleScaleType = (e) => {
    setScaleType(e.currentTarget.value)
  }
  const _handleDatesAdjusted = (e) => {
    setDatesAdjusted(e.currentTarget.value)
  }

  return (
    <div>
      <div>
        <div className='inline-flex'>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Cases</div>
            <input
              type='radio'
              id='deaths'
              name='cases'
              value='deaths'
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor='deaths'>Deaths</label>
            <input
              type='radio'
              id='confirmed'
              name='cases'
              value='confirmed'
              defaultChecked
              onChange={(e) => _handleCasesType(e)}
            />
            <label htmlFor='confirmed'>Confirmed</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Data type</div>
            <input
              type='radio'
              id='cumulative'
              name='data-type'
              value='cumulative'
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor='cumulative'>Cumulative</label>
            <input
              type='radio'
              id='new'
              name='data-type'
              value='new'
              defaultChecked
              onChange={(e) => _handleDataType(e)}
            />
            <label htmlFor='new'>New</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Show Scale as</div>
            <input
              type='radio'
              id='log'
              name='display-type'
              value='log'
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor='log'>Log</label>
            <input
              type='radio'
              id='linear'
              name='display-type'
              value='linear'
              defaultChecked
              onChange={(e) => _handleScaleType(e)}
            />
            <label htmlFor='linear'>Linear</label>
          </div>
          <div className='radio-toolbar m-3'>
            <div className='radio-title'>Date adjusted to outbreak start</div>
            <input
              type='radio'
              id='on'
              name='adjust-date'
              value='on'
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor='on'>On</label>
            <input
              type='radio'
              id='off'
              name='adjust-date'
              value='off'
              defaultChecked
              onChange={(e) => _handleDatesAdjusted(e)}
            />
            <label htmlFor='off'>Off</label>
          </div>
        </div>
      </div>
      <LineChart data={propsData} />
    </div>
  )
}

export default CovidDashboard
