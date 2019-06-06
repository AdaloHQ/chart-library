//import Icon from "./_laska_/Icon";
import React, {Component} from 'react'

import {
  ActivityIndicator,
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native'

//import {BarChart} from 'react-native-chart-kit'
//import '../../node_modules/react-vis/dist/style.css'
import{XYPlot, VerticalBarSeries} from 'react-vis'

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0}
];

export default class BarChartComponent extends Component {
  render(){
    console.log(this.props)
    return(
      <XYPlot height={200} width={200} color={rgb2hex(this.props.barchartstyles.bar_color)}>
        <VerticalBarSeries data={data}/>
      </XYPlot>
    )
  }
    // render() {

    //   let data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [{
    //       data: [ 20, 45, 28, 80, 99, 43 ]
    //     }]
    //   }
    //   let chartConfig = {
    //     backgroundGradientFrom: '#1E2923',
    //     backgroundGradientTo: '#08130D',
    //     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    //     strokeWidth: 2 // optional, default 3
    //   }
    //   console.log(this.props.barchartstyles.bar_color)

    //   let color = rgb2hex(this.props.barchartstyles.bar_color)

    //   console.log(color)

    // return (<View>
    //     <BarChart  style={{
    //         marginVertical: 8,
    //         borderRadius: 16
    //       }}
    //         data={data}
    //         width={Dimensions.get('window').width}
    //         height={220}
    //         yAxisLabel={'$'}
    //         chartConfig={chartConfig}/>
    // </View>)
    //     //return this.renderSub()
    // }
}

function rgb2hex(rgb){
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : ''
 }
