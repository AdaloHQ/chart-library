//import Icon from "./_laska_/Icon";
import React, { Component } from 'react'


import {View} from 'react-native'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryContainer } from "victory-native"

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
    let { barchartdesc, barchartstyles, editor, listLoading } = this.props
    let width  =  this.props._width
    let height = this.props._height
    if (!barchartdesc) { 
      data = [ { x: "null 1", y: 2 },
      { x: "null 2", y: 3 },
      { x: "null 3", y: 5 }]
      
      if(this.state.width){
        if(listLoading){
          return(<View> 
      </View>)
        }
      return (<View>
      
      <VictoryContainer width = {this.state.width} height = {height}>
              <VictoryChart domainPadding={{ x:(width/data.length * .3) }}
              standalone={false}
                width={this.state.width}
                height={height}>
                <VictoryLabel text={"No Chart Data"} x={27} y={10} textAnchor="start" style={{ fontFamily:"inherit", fontSize: 16*1.3, fill: "#212121" }} />
                <VictoryLabel text={"Please input chart data"} x={27} y={30} textAnchor="start" style={{ fontFamily:"inherit", fontSize: 12*1.3, fill: "#BABABA" }} />
                <VictoryAxis dependentAxis
                  label={"Y Axis"}
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
                  label={"X Axis"}
                  style={{
                    axis:{stroke:"#9E9E9E"},
                    tickLabels: { fontFamily:"inherit", fontSize: 9*1.3, fill: "#9E9E9E" },
                    axisLabel: { fontFamily:"inherit", fontSize: 9*1.3, padding: 40, fill: "#9E9E9E" }
                  }}
                />
                <VictoryBar
                  style={{
                    data: { fill: "black" },
                    labels: { fontFamily:"inherit", fontSize: 11*1.3, fill: "#424242" }
                  }}
                  data={data}
                 
                />
  
  
              </VictoryChart>
      </VictoryContainer>
      
      </View>)
      }
      return(<View style={{flex: 1, alignSelf: 'stretch'}} onLayout={this.onLayout}>
          
    </View>) 
    
    }
    if (editor) {
      for (let i = 0; i < barchartdesc.length; ++i) {
        let variables = barchartdesc[i]
        let xvalue = variables.xaxis + " " + i
        data.push({ x: xvalue, y: 10 })
      }
      data.push({x: barchartdesc[0].xaxis+" "+4, y:10})
      data.push({x: barchartdesc[0].xaxis+" "+5, y:10})
        return (
      
          <VictoryContainer width = {width} height = {height}>
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
                  tickLabels: {
                    fontFamily: "inherit", fontSize: 9 * 1.3, padding: 10, fill: "#9E9E9E"
                   },
                  axisLabel: { fontFamily:"inherit", fontSize: 13, padding: 30, fill: "#BDBDBD" }
                }} />
              <VictoryAxis tickFormat={(t) => {
              if (data.length == 2) {
                if (t.length > 24) {
                  return t.substring(0, 25)
                }
              }
              if (data.length > 2) {
                if (t.length >= 13) {

                  return t.substring(0, 12)
                }


              }
              return t
            }}
                label={barchartstyles.x_axis_label}
                style={{
                  axis:{stroke:"#9E9E9E"},
                  tickLabels: {
                    fontFamily: "inherit", fontSize: 9 * 1.3, padding: 10, fill: "#9E9E9E"
                    , textAnchor: (d) => {
                      if (data.length < 4) {
  
                        return "middle"
                      }
  
                      if (data[d - 1].x.length > 11 - (2 * (data.length - 3))) {
                        return "start"
                      }
                      // if((data[d-1].x.length)>= ((68 - (Math.pow(2,(data.length-2)) ))/data.length)) { return "start" }
                      // return "middle"
                      return "middle"
                    }, angle: (d) => {
                      if (data.length < 4) {
  
                        return 0
                      }

                      if (data[d - 1].x.length > 11 - (2 * (data.length - 3))) {
                        return 20
                      }
                      return 0
                    }
                  },
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

            </VictoryContainer>

          )
     
    }

    for (let i = 0; i < barchartdesc.length; ++i) {
      let variables = barchartdesc[i]

      data.push({ x: variables.xaxis, y: variables.yaxis })
    }
    
    if(this.state.width){
      
    return (<View>
    <VictoryContainer width = {this.state.width} height = {height}>
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
              if (data.length == 2) {
                if (t.length > 24) {
                  return t.substring(0, 25)
                }
              }
              if (data.length > 2) {
                if (t.length >= 13) {

                  return t.substring(0, 12)
                }


              }
              return t
            }}
                label={barchartstyles.x_axis_label}
                style={{
                  axis:{stroke:"#9E9E9E"},
                  tickLabels: {
                    fontFamily: "inherit", fontSize: 9 * 1.3, padding: 10, fill: "#9E9E9E"
                    , textAnchor: (d) => {
                      if (data.length < 4) {
  
                        return "middle"
                      }
  
                      if (data[d - 1].x.length > 11 - (2 * (data.length - 3))) {
                        return "start"
                      }
                      // if((data[d-1].x.length)>= ((68 - (Math.pow(2,(data.length-2)) ))/data.length)) { return "start" }
                      // return "middle"
                      return "middle"
                    }, angle: (d) => {
                      if (data.length < 4) {
  
                        return 0
                      }
  
                      if (data[d - 1].x.length > 11 - (2 * (data.length - 3))) {
                        return 20
                      }
                      return 0
                    }
                  },
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
    </VictoryContainer>
    
    </View>)
    }
    return(<View style={{flex: 1, alignSelf: 'stretch'}} onLayout={this.onLayout}>
        
  </View>)
  }


}

