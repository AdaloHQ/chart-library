//import Icon from "./_laska_/Icon";
import React, { Component } from 'react'

import {
  View,

} from 'react-native'

import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel, VictoryPortal, VictoryClipContainer } from "victory-native"

export default class LineChartComponent extends Component {


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
    let data, max
    let { linechartdesc, linechartstyles, editor } = this.props
    let width = this.props._width
    let height = this.props._height
    if (!linechartdesc) { return null }

    if (editor) {
      data = [
        { x: linechartdesc[0].xaxis + "1", y: 2 },
        { x: linechartdesc[0].xaxis + "2", y: 3 },
        { x: linechartdesc[0].xaxis + "3", y: 5 },
        { x: linechartdesc[0].xaxis + "4", y: 4 },
        { x: linechartdesc[0].xaxis + "5", y: 7 },


      ]
      max = data.reduce((prev, current) => (prev.y > current.y) ? prev : current)

      return (

        <svg viewBox={"0 0" + " " + width + " " + height} preserveAspectRatio="none" width="100%">
          <VictoryChart domainPadding={{ x: 40 }}
            standalone={false}
            width={width}
            height={height}
            minDomain={{ y: 0 }}
            maxDomain={{ y: max.y + 1 }}
          >
            <VictoryLabel text={linechartstyles.chart_title} x={27} y={15} textAnchor="start" style={{ fontFamily: "inherit", fontSize: (16 * 1.3), fill: "#212121" }} />
            <VictoryLabel text={linechartstyles.chart_subtitle} x={27} y={30} textAnchor="start" style={{ fontFamily: "inherit", fontSize: (12 * 1.3), fill: "#BABABA" }} />
            <VictoryAxis dependentAxis
              label={linechartstyles.y_axis_label}
              style={{
                axis: { stroke: "transparent" },
                grid: { stroke: "#E0E0E0" },
                tickLabels: { fontFamily: "inherit", fontSize: 13, fill: "#BDBDBD" },
                axisLabel: { fontFamily: "inherit", fontSize: 13, padding: 30, fill: "#BDBDBD" }
              }} />

            <VictoryAxis tickFormat={(t) => {
              if (data.length == 2) {
                if (t.length > 24) {
                  return t.substring(0, 25)
                }
              }
              if (data.length > 2) {
                if (t.length >= 14) {

                  return t.substring(0, 13)
                }


              }
              return t
            }}

              label={linechartstyles.x_axis_label}
              style={{
                axis: { stroke: "#9E9E9E" },
                grid: { stroke: "#E0E0E0" },
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
                axisLabel: { fontFamily: "inherit", fontSize: 9 * 1.3, padding: 25, fill: "#9E9E9E" }
              }}
            />
            <VictoryLine
              style={{
                data: { stroke: linechartstyles.line_color },
                parent: { border: "1px solid #ccc" }
              }}
              data={data}
              labels={(d) => {
                if (linechartstyles.toggle_label) { return d.y }
                return ""
              }}
              labelComponent={<VictoryLabel dy={15} />}
            />
            <VictoryPortal>
              <VictoryScatter
                style={{
                  data: {
                    fill: () => {
                      if (linechartstyles.toggle_point) { return "black" }
                      return "transparent"
                    }
                  }
                }}
                data={data}
              />
            </VictoryPortal>

          </VictoryChart>

        </svg>

      )

    }
    data = []
    for (let i = 0; i < linechartdesc.length; ++i) {
      let variables = linechartdesc[i]

      data.push({ x: variables.xaxis, y: variables.yaxis })
    }

    max = data.reduce((prev, current) => (prev.y > current.y) ? prev : current)

    if (this.state.width) {

      return (<View>

        <svg viewBox={"0 0" + " " + this.state.width + " " + height} preserveAspectRatio="none" width="100%">
          <VictoryChart domainPadding={{ x: 40 }}
            standalone={false}
            width={this.state.width}
            height={height}>
            <VictoryLabel text={linechartstyles.chart_title} x={27} y={15} textAnchor="start" style={{ fontFamily: "inherit", fontSize: 16 * 1.3, fill: "#212121" }} />
            <VictoryLabel text={linechartstyles.chart_subtitle} x={27} y={30} textAnchor="start" style={{ fontFamily: "inherit", fontSize: 12 * 1.3, fill: "#BABABA" }} />
            <VictoryAxis dependentAxis
              label={linechartstyles.y_axis_label}
              style={{
                axis: { stroke: "transparent" },
                grid: { stroke: "#E0E0E0" },
                tickLabels: { fontFamily: "inherit", fontSize: 10 * 1.3, fill: "#BDBDBD" },
                axisLabel: { fontFamily: "inherit", fontSize: 10 * 1.3, padding: 30, fill: "#BDBDBD" }
              }} />
            <VictoryAxis tickFormat={(t) => {
              if (data.length == 2) {
                if (t.length > 24) {
                  return t.substring(0, 25)
                }
              }
              if (data.length > 2) {
                if (t.length >= 14) {

                  return t.substring(0, 13)
                }


              }
              return t
            }}

              label={linechartstyles.x_axis_label}
              style={{
                axis: { stroke: "#9E9E9E" },
                grid: { stroke: "#E0E0E0" },
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
                axisLabel: { fontFamily: "inherit", fontSize: 9 * 1.3, padding: 25, fill: "#9E9E9E" }
              }}
            />
            <VictoryLine

              style={{
                data: { stroke: linechartstyles.line_color },
                parent: { border: "1px solid #ccc" }
              }}
              data={data}
              groupComponent={<VictoryClipContainer clipPadding={{ top: 10, bottom: 10 }} />}
              labels={(d) => {
                if (linechartstyles.toggle_label) { return d.y }
                return ""
              }}
              labelComponent={<VictoryLabel dy={15} />}

            />
            <VictoryPortal>
              <VictoryScatter
                style={{
                  data: {
                    fill: () => {
                      if (linechartstyles.toggle_point) { return "black" }
                      return "transparent"
                    }
                  }
                }}
                data={data}
                events={[{
                  target: "data",
                  eventHandlers: {
                    onClick: (d, i) => {
                      linechartdesc[i.index].pointaction()
                    }
                  }
                }]}
              />
            </VictoryPortal>

          </VictoryChart>
        </svg>

      </View>)
    }
    return (<View style={{ flex: 1, alignSelf: 'stretch' }} onLayout={this.onLayout}>

    </View>)
  }


}

