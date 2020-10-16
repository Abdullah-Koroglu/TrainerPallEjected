import React, { useContext, useEffect , useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SVG } from 'expo'
import { Context as TempContext } from '../context/TempContext'
const width = Dimensions.get('window')
const height = 200

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';

const d3 = {
  scale,
  shape,
  format,
  axis,
};
import {
  scaleTime,
  scaleLinear
} from 'd3-scale';

const data = [
  { x: 10, y: 10 },
  { x: 150, y: 200 },
  { x: 250, y: 1100 },
  { x: 500, y: 300 },
  { x: 750, y: 900 },
  { x: 1000, y: 400 },
]




export default TestiScreen = (props) => {
  const _id = props.route.params._id
  let scaleX
  let scaleYmax
  let scaleYmin
  let tutmac = []
  let tutmac1 = []
  const { state, fetchTemp } = useContext(TempContext)
  const tempDatas = state.temps.find(t => t._id === _id).datas
  const [durations, setdurations] = useState([0])
  const [HRs, setHRs] = useState([])
  const [chartData, setChartData] = useState([])
  const [deger, setdeger] = useState([0])
  const [deger1, setdeger1] = useState([0])
  const [endofworkot, setendofworkot] = useState(10)
  useEffect(() => {
    fetchTemp()
    datalarial()
    setendofworkot(durations[durations.length - 1])
    durations.pop()
    console.log(durations, HRs);
    getChart()
    console.log(chartData);

  }, [])

  datalarial = () => {
    for (let a of tempDatas) {
      durations.push(a.instants.duration / 1000)
      tutukmax = a.instants.maxHR
      tutukmin = a.instants.minHR
      HRs.push({ tutukmax, tutukmin })
      for (let i = 0; i < a.instants.duration / 1000; i++) {
        tutmac.push(a.instants.maxHR)
        tutmac1.push(a.instants.minHR)
      }
    }
    setdeger(tutmac)
    setdeger1(tutmac1)
  }

  getChart =()=>{
    for (let index = 0; index < durations.length; index++) {
       chartData.push({x : durations[index] ,  ymax : HRs[index].tutukmax , ymin : HRs[index].tutukmin})
    }
    // chartData.push({x : endofworkot , ymax : HRs[HRs.length-1].tutukmax , ymin : HRs[HRs.length-1].tutukmin})
  }
  scaleX = scaleLinear().domain([0, endofworkot]).range([0, 400])

  scaleYmax = scaleLinear().domain([120, 160]).range([100, 0])
  scaleYmin = scaleLinear().domain([100, 140]).range([100, 0])

  let linemax = d3.shape.line()
    .x(d => scaleX(d.x))
    .y(d => scaleYmax(d.ymax))
    .curve(d3.shape.curveLinear)(chartData)
    let linemin = d3.shape.line()
    .x(d => scaleX(d.x))
    .y(d => scaleYmax(d.ymin))
    .curve(d3.shape.curveLinear)(chartData)

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={()=>{console.log(endofworkot , HRs)}} >
        <Svg
          width='450'
          height="900"
          fill="blue"
          stroke="red"
          color="green"
          viewBox="-16 -16 544 544"
          style={{ width: 2000, height: height, marginTop: 40, marginLeft: 100 }}
        >
          <Path stroke="currentColor" strokeWidth="4" fill="transparent" d={linemax}></Path>
          <Path stroke="currentColor" strokeWidth="4" fill="transparent" d={linemin}></Path>
          <Path d="M0,150 L512,150" stroke="currentColor" strokeWidth="4" />
          <Path d="M0,150 0,0" stroke="currentColor" strokeWidth="4" />
        </Svg>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});