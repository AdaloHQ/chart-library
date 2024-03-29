//import Icon from "./_laska_/Icon";
import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native'

import Svg from '../Svg'

const getFontFamily = () => (Platform.OS === 'web' ? 'inherit' : 'System')

export default class BarChartComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: undefined,
      height: undefined,
    }
  }

  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width,
    })
  }

  render() {
    let data = []
    let { barchartdesc, barchartstyles, editor, _fonts } = this.props
    let width = this.props._width
    let height = this.props._height

    let fontFamily = getFontFamily()

    if (this.props.barchartstyles && this.props.barchartstyles.styles) {
      fontFamily = this.props.barchartstyles.styles.x_axis_label.fontFamily
    } else if (_fonts) {
      fontFamily = _fonts.body
    }

    if (!barchartdesc) {
      return null
    }

    //custom fonts additions
    const customFontStyles =
      this.props.barchartstyles && this.props.barchartstyles.styles
        ? {
            chart_title: {
              ...this.props.barchartstyles.styles.chart_title,
              fill: this.props.barchartstyles.styles.chart_title.color,
            },
            chart_subtitle: {
              ...this.props.barchartstyles.styles.chart_subtitle,
              fill: this.props.barchartstyles.styles.chart_subtitle.color,
            },
            y_axis_label: {
              ...this.props.barchartstyles.styles.y_axis_label,
              fill: this.props.barchartstyles.styles.y_axis_label.color,
            },
            x_axis_label: {
              ...this.props.barchartstyles.styles.x_axis_label,
              fill: this.props.barchartstyles.styles.x_axis_label.color,
            },
          }
        : {
            chart_title: {},
            chart_subtitle: {},
            y_axis_label: {},
            x_axis_label: {},
          }
    if (editor) {
      for (let i = 0; i < barchartdesc.length; ++i) {
        let variables = barchartdesc[i]
        let xvalue = variables.xaxis + ' ' + i
        data.push({ x: xvalue, y: 10 })
      }
      data.push({ x: barchartdesc[0].xaxis + ' ' + 4, y: 10 })
      data.push({ x: barchartdesc[0].xaxis + ' ' + 5, y: 10 })
      return (
        <Svg
          viewBox={'0 0' + ' ' + width + ' ' + height}
          preserveAspectRatio="none"
          width="100%"
          height={height}
        >
          <VictoryChart
            domainPadding={{ x: 40 }}
            standalone={false}
            width={width}
            height={height}
            maxDomain={{ y: 2 * data[0].y }}
          >
            <VictoryLabel
              text={barchartstyles.chart_title}
              x={27}
              y={15}
              textAnchor="start"
              style={{
                fontFamily,
                fontSize: 16 * 1.3,
                fill: '#212121',
                ...customFontStyles.chart_title,
              }}
            />
            <VictoryLabel
              text={barchartstyles.chart_subtitle}
              x={27}
              y={30}
              textAnchor="start"
              style={{
                fontFamily,
                fontSize: 12 * 1.3,
                fill: '#BABABA',
                ...customFontStyles.chart_subtitle,
              }}
            />
            <VictoryAxis
              dependentAxis
              label={barchartstyles.y_axis_label}
              style={{
                axis: { stroke: 'transparent' },
                grid: { stroke: '#E0E0E0' },
                tickLabels: {
                  fontFamily,
                  fontSize: 9 * 1.3,
                  padding: 10,
                  fill: '#9E9E9E',
                },
                axisLabel: {
                  fontFamily,
                  fontSize: 13,
                  padding: 30,
                  fill: '#BDBDBD',
                  ...customFontStyles.y_axis_label,
                },
              }}
            />
            <VictoryAxis
              tickFormat={t => {
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
                axis: { stroke: '#9E9E9E' },
                tickLabels: {
                  fontFamily,
                  fontSize: 9 * 1.3,
                  padding: 10,
                  fill: '#9E9E9E',
                  textAnchor: d => {
                    if (data.length < 4) {
                      return 'middle'
                    }

                    if (data[d - 1].x.length > 11 - 2 * (data.length - 3)) {
                      return 'start'
                    }
                    // if((data[d-1].x.length)>= ((68 - (Math.pow(2,(data.length-2)) ))/data.length)) { return "start" }
                    // return "middle"
                    return 'middle'
                  },
                  angle: d => {
                    if (data.length < 4) {
                      return 0
                    }

                    if (data[d - 1].x.length > 11 - 2 * (data.length - 3)) {
                      return 20
                    }
                    return 0
                  },
                },
                axisLabel: {
                  fontFamily,
                  fontSize: 9 * 1.3,
                  padding: 40,
                  fill: '#9E9E9E',
                  ...customFontStyles.x_axis_label,
                },
              }}
            />
            <VictoryBar
              style={{
                data: { fill: barchartstyles.bar_color },
                labels: {
                  fontFamily,
                  fontSize: 11 * 1.3,
                  fill: '#424242',
                },
              }}
              data={data}
              labels={d => {
                if (barchartstyles.toggle_label) {
                  return d.y
                }
                return ''
              }}
              labelComponent={<VictoryLabel dy={10} />}
            />
          </VictoryChart>
        </Svg>
      )
    }

    if (!!barchartdesc) {
      for (let i = 0; i < barchartdesc.length; ++i) {
        let variables = barchartdesc[i]

        data.push({ x: variables.xaxis, y: variables.yaxis })
      }
    }

    const defaultContainerProps = {
      style: {
        flex: 1,
        alignSelf: 'stretch',
      },
      onLayout: this.onLayout,
    }

    if (this.state.width && !!barchartdesc) {
      return (
        <View {...defaultContainerProps}>
          <Svg
            viewBox={'0 0' + ' ' + this.state.width + ' ' + height}
            preserveAspectRatio="none"
            width="100%"
            height={height}
          >
            <VictoryChart
              domainPadding={{ x: 40 }}
              standalone={false}
              width={this.state.width}
              height={height}
            >
              <VictoryLabel
                text={barchartstyles.chart_title}
                x={27}
                y={15}
                textAnchor="start"
                style={{
                  fontFamily,
                  fontSize: 16 * 1.3,
                  fill: '#212121',
                  ...customFontStyles.chart_title,
                }}
              />
              <VictoryLabel
                text={barchartstyles.chart_subtitle}
                x={27}
                y={30}
                textAnchor="start"
                style={{
                  fontFamily,
                  fontSize: 12 * 1.3,
                  fill: '#BABABA',
                  ...customFontStyles.chart_subtitle,
                }}
              />
              <VictoryAxis
                dependentAxis
                label={barchartstyles.y_axis_label}
                style={{
                  axis: { stroke: 'transparent' },
                  grid: { stroke: '#E0E0E0' },
                  tickLabels: {
                    fontFamily,
                    fontSize: 10 * 1.3,
                    fill: '#BDBDBD',
                  },
                  axisLabel: {
                    fontFamily,
                    fontSize: 10 * 1.3,
                    padding: 30,
                    fill: '#BDBDBD',
                    ...customFontStyles.y_axis_label,
                  },
                }}
              />
              <VictoryAxis
                tickFormat={t => {
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
                  axis: { stroke: '#9E9E9E' },
                  tickLabels: {
                    fontFamily,
                    fontSize: 9 * 1.3,
                    padding: 10,
                    fill: '#9E9E9E',
                    textAnchor: d => {
                      if (data.length < 4) {
                        return 'middle'
                      }

                      if (data[d - 1].x.length > 11 - 2 * (data.length - 3)) {
                        return 'start'
                      }
                      // if((data[d-1].x.length)>= ((68 - (Math.pow(2,(data.length-2)) ))/data.length)) { return "start" }
                      // return "middle"
                      return 'middle'
                    },
                    angle: d => {
                      if (data.length < 4) {
                        return 0
                      }

                      if (data[d - 1].x.length > 11 - 2 * (data.length - 3)) {
                        return 20
                      }
                      return 0
                    },
                  },
                  axisLabel: {
                    fontFamily,
                    fontSize: 9 * 1.3,
                    padding: 40,
                    fill: '#9E9E9E',
                    ...customFontStyles.x_axis_label,
                  },
                }}
              />
              <VictoryBar
                style={{
                  data: { fill: barchartstyles.bar_color },
                  labels: {
                    fontFamily,
                    fontSize: 11 * 1.3,
                    fill: '#424242',
                  },
                }}
                data={data}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onClick: (d, i) => {
                        barchartdesc[i.index].baraction()
                      },
                    },
                  },
                ]}
                labels={d => {
                  if (barchartstyles.toggle_label) {
                    return d.y
                  }
                  return ''
                }}
                labelComponent={<VictoryLabel dy={10} />}
              />
            </VictoryChart>
          </Svg>
        </View>
      )
    }

    return <View {...defaultContainerProps}></View>
  }
}
