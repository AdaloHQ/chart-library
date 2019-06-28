//import Icon from "./_laska_/Icon";
import React, { Component } from 'react'

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

import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, Bar, VictoryPortal, } from "victory-native"



const wrap = (s) => s.replace(
  /(?![^\n]{1,10}$)([^\n]{1,10})\s/g, '$1\n'
)

export default class BarChartComponent extends Component {
  

  constructor(props) {
    super(props);

    this.state = {

      width: undefined,
      height: undefined
    }
  }

  

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
    })
  }

  render() {
    let data = []
    let { barchartdesc, barchartstyles, editor } = this.props
    let width  =  this.props._width
    let height = this.props._height
    if (!barchartdesc) { return null }
    if (editor) {
      for (let i = 0; i < barchartdesc.length; ++i) {
        let variables = barchartdesc[i]
        let xvalue = variables.xaxis + " " + i
        data.push({ x: xvalue, y: 10 })
      }

        return (
      
          <svg viewBox={"0 0" + " "+ width +" " + height}  preserveAspectRatio="none" width="100%">
            <VictoryChart domainPadding={{ x: (width/data.length * .3) }}
            standalone={false}
              width={width}
              height={height}
              maxDomain={{ y: 2 * (data[0].y) }}>
              <VictoryLabel text={barchartstyles.chart_title} x={27} y={10} textAnchor="start" style={{ fontFamily:"inherit", fontSize: (16*1.3), fill: "#212121" }} />
              <VictoryLabel text={barchartstyles.chart_subtitle} x={27} y={30} textAnchor="start" style={{ fontFamily:"inherit", fontSize: (12*1.3), fill: "#BABABA" }} />
              <VictoryAxis dependentAxis
                label={barchartstyles.y_axis_label}
                style={{
                  axis:{stroke:"transparent"},
                  grid: { stroke: "#E0E0E0" },
                  tickLabels: { fontFamily:"inherit", fontSize: 13, fill: "#BDBDBD" },
                  axisLabel: { fontFamily:"inherit", fontSize: 13, padding: 30, fill: "#BDBDBD" }
                }} />
              <VictoryAxis tickFormat={(t) => {
                  

                  let result = wrap(t)
                    
                  return result
              }}
                label={barchartstyles.x_axis_label}
                style={{
                  axis:{stroke:"#9E9E9E"},
                  tickLabels: { fontFamily:"inherit", fontSize: 9*1.3, fill: "#9E9E9E" },
                  axisLabel: { fontFamily:"inherit", fontSize: 9*1.3, padding: 40, fill: "#9E9E9E" }
                }}
              />
              <VictoryBar
                style={{
                  data: { fill: barchartstyles.bar_color },
                  labels: { fontFamily:"inherit", fontSize: 11*1.3, fill: "#424242" }
                }}
                data={data}
                labels={(d) => {
                  if (barchartstyles.toggle_label) { return d.y }
                  return ""
                }}
                labelComponent={<VictoryLabel dy={10}/>}
              />


            </VictoryChart>

    </svg>

          )
     
    }

    for (let i = 0; i < barchartdesc.length; ++i) {
      let variables = barchartdesc[i]

      data.push({ x: variables.xaxis, y: variables.yaxis })
    }
    
    if(this.state.width){
      
    return (<View>
    
      <svg viewBox={"0 0" + " "+ this.state.width +" " + height}  preserveAspectRatio="none" width="100%">
            <VictoryChart domainPadding={{ x:(width/data.length * .3) }}
            standalone={false}
              width={this.state.width}
              height={height}>
              <VictoryLabel text={barchartstyles.chart_title} x={27} y={10} textAnchor="start" style={{ fontFamily:"inherit", fontSize: 16*1.3, fill: "#212121" }} />
              <VictoryLabel text={barchartstyles.chart_subtitle} x={27} y={30} textAnchor="start" style={{ fontFamily:"inherit", fontSize: 12*1.3, fill: "#BABABA" }} />
              <VictoryAxis dependentAxis
                label={barchartstyles.y_axis_label}
                style={{
                  axis:{stroke:"transparent"},
                  grid: { stroke: "#E0E0E0" },
                  tickLabels: { fontFamily:"inherit", fontSize: 10*1.3, fill: "#BDBDBD" },
                  axisLabel: { fontFamily:"inherit", fontSize: 10*1.3, padding: 30, fill: "#BDBDBD" }
                }} />
              <VictoryAxis tickFormat={(t) => {
                 let result = wrap(t)
                    
                 return result
              }}
                label={barchartstyles.x_axis_label}
                style={{
                  axis:{stroke:"#9E9E9E"},
                  tickLabels: { fontFamily:"inherit", fontSize: 9*1.3, fill: "#9E9E9E" },
                  axisLabel: { fontFamily:"inherit", fontSize: 9*1.3, padding: 40, fill: "#9E9E9E" }
                }}
              />
              <VictoryBar
                style={{
                  data: { fill: barchartstyles.bar_color },
                  labels: { fontFamily:"inherit", fontSize: 11*1.3, fill: "#424242" }
                }}
                data={data}
                events={[{
                  target: "data",
                  eventHandlers: {
                    onClick: (d,i) => {
                      barchartdesc[i.index].baraction()}
                  }
                }]}
                labels={(d) => {
                  if (barchartstyles.toggle_label) { return d.y }
                  return ""
                }}
                labelComponent={<VictoryLabel dy={10}/>}
              />


            </VictoryChart>
    </svg>
    
    </View>)
    }
    return(<View style={{flex: 1, alignSelf: 'stretch'}} onLayout={this.onLayout}>
        
  </View>)
  }


}

