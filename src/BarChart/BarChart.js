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





export default class BarChartComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {

      width: undefined,
      height: undefined
    }
    console.log("COnstructor width: ", this.state.width)
  }

  // componentDidMount() {
  //   this.setState({
  //     chartWidth: window.innerWidth
  //   });
  //   window.addEventListener('resize', this.updateDimensions.bind(this));
  //   // remove this on unmount 
  // }

  // updateDimensions(event) {
  //   this.setState({
  //     chartWidth: event.target.innerWidth
  //   }) 
  // }

  onLayout = (e) => {
    console.log("New Width", e.nativeEvent.layout.Width)
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    })
  }

  render() {
    console.log(this.props)
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

      // if (width) {
      

        return (
      
          <svg viewBox={"0 0" + " "+ width +" " + height}  preserveAspectRatio="none" width="100%">
            <VictoryChart domainPadding={{ x: 40 }}
            standalone={false}
              width={width}
              height={height}
              maxDomain={{ y: 2 * (data[0].y) }}>
              <VictoryLabel text={barchartstyles.chart_title} x={10} y={height*.05} textAnchor="start" style={{ fontSize: 16, fill: "#212121" }} />
              <VictoryLabel text={barchartstyles.chart_subtitle} x={10} y={(height*.05)+15} textAnchor="start" style={{ fontSize: 12, fill: "#BABABA" }} />
              <VictoryAxis dependentAxis
                label={barchartstyles.y_axis_label}
                style={{
                  axis:{stroke:"transparent"},
                  grid: { stroke: "#E0E0E0" },
                  tickLabels: { fontSize: 10, fill: "#BDBDBD" },
                  axisLabel: { fontSize: 10, padding: 30, fill: "#BDBDBD" }
                }} />
              <VictoryAxis tickFormat={(t) => {
               
                return t;
              }}
                label={barchartstyles.x_axis_label}
                style={{
                  axis:{stroke:"#9E9E9E"},
                  tickLabels: { fontSize: 9, fill: "#9E9E9E" },
                  axisLabel: { fontSize: 9, padding: 30, fill: "#9E9E9E" }
                }}
              />
              <VictoryBar
                style={{
                  data: { fill: barchartstyles.bar_color },
                  labels: { fontSize: 11, fill: "#424242" }
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
      console.log("Width", this.state.width)
    return (<View>
    
      <svg viewBox={"0 0" + " "+ this.state.width +" " + height}  preserveAspectRatio="none" width="100%">
            <VictoryChart domainPadding={{ x: 40 }}
            standalone={false}
              width={this.state.width}
              height={height}>
              <VictoryLabel text={barchartstyles.chart_title} x={10} y={height*.05} textAnchor="start" style={{ fontSize: 16, fill: "#212121" }} />
              <VictoryLabel text={barchartstyles.chart_subtitle} x={10} y={(height*.05)+15} textAnchor="start" style={{ fontSize: 12, fill: "#BABABA" }} />
              <VictoryAxis dependentAxis
                label={barchartstyles.y_axis_label}
                style={{
                  axis:{stroke:"transparent"},
                  grid: { stroke: "#E0E0E0" },
                  tickLabels: { fontSize: 10, fill: "#BDBDBD" },
                  axisLabel: { fontSize: 10, padding: 30, fill: "#BDBDBD" }
                }} />
              <VictoryAxis tickFormat={(t) => {
                return t.substring(0, 8) + "..."
              }}
                label={barchartstyles.x_axis_label}
                style={{
                  axis:{stroke:"#9E9E9E"},
                  tickLabels: { fontSize: 9, fill: "#9E9E9E" },
                  axisLabel: { fontSize: 9, padding: 30, fill: "#9E9E9E" }
                }}
              />
              <VictoryBar
                style={{
                  data: { fill: barchartstyles.bar_color },
                  labels: { fontSize: 11, fill: "#424242" }
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
        {console.log('Reached')}
  </View>)
  }


}


