//import Icon from "./_laska_/Icon";
import React, { Component } from 'react'

import { View, Platform } from 'react-native'

import {
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel,
  VictoryPortal,
  VictoryClipContainer,
} from 'victory-native'

import Svg from '../Svg'

const getFontFamily = () => (Platform.OS === 'web' ? 'inherit' : 'System')

export default class LineChartComponent extends Component {
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
    let data = [{ x: 'no value 1', y: 0 }]

    let max
    let { linechartdesc, linechartstyles, editor, _fonts } = this.props
    let width = this.props._width
    let height = this.props._height

    let fontFamily = getFontFamily()

    if (this.props.linechartstyles && this.props.linechartstyles.styles) {
      fontFamily = this.props.linechartstyles.styles.x_axis_label.fontFamily
    } else if (_fonts) {
      fontFamily = _fonts.body
    }

    const customFontStyles =
      this.props.linechartstyles && this.props.linechartstyles.styles
        ? {
            chart_title: {
              ...this.props.linechartstyles.styles.chart_title,
              fill: this.props.linechartstyles.styles.chart_title.color,
            },
            chart_subtitle: {
              ...this.props.linechartstyles.styles.chart_subtitle,
              fill: this.props.linechartstyles.styles.chart_subtitle.color,
            },
            y_axis_label: {
              ...this.props.linechartstyles.styles.y_axis_label,
              fill: this.props.linechartstyles.styles.y_axis_label.color,
              padding: 30,
            },
            x_axis_label: {
              ...this.props.linechartstyles.styles.x_axis_label,
              fill: this.props.linechartstyles.styles.x_axis_label.color,
              padding: 25,
            },
          }
        : {
            chart_title: {},
            chart_subtitle: {},
            y_axis_label: {},
            x_axis_label: {},
          }

    // Prevent null values from being passed into android
    // console.log('customFontStyles:', customFontStyles)

    // if (Platform.OS === 'android') {
    //   for (let styleObjKey of Object.keys(customFontStyles)) {
    //     for (let styleKey of Object.keys(customFontStyles[styleObjKey])) {
    //       if (customFontStyles[styleObjKey][styleKey] === null) {
    //         delete customFontStyles[styleObjKey][styleKey]
    //       }
    //     }
    //   }
    // }

    if (editor) {
      data = [
        { x: linechartdesc[0].xaxis + '1', y: 2 },
        { x: linechartdesc[0].xaxis + '2', y: 3 },
        { x: linechartdesc[0].xaxis + '3', y: 5 },
        { x: linechartdesc[0].xaxis + '4', y: 4 },
        { x: linechartdesc[0].xaxis + '5', y: 7 },
      ]
      max = data.reduce((prev, current) =>
        prev.y > current.y ? prev : current
      )

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
            minDomain={{ y: 0 }}
            maxDomain={{ y: max.y + 1 }}
          >
            <VictoryLabel
              text={linechartstyles.chart_title}
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
              text={linechartstyles.chart_subtitle}
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
              label={linechartstyles.y_axis_label}
              style={{
                axis: { stroke: 'transparent' },
                grid: { stroke: '#E0E0E0' },
                tickLabels: {
                  fontFamily,
                  fontSize: 13,
                  fill: '#BDBDBD',
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
                  if (t.length >= 14) {
                    return t.substring(0, 13)
                  }
                }
                return t
              }}
              label={linechartstyles.x_axis_label}
              style={{
                axis: { stroke: '#9E9E9E' },
                grid: { stroke: '#E0E0E0' },
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
                  padding: 25,
                  fill: '#9E9E9E',
                  ...customFontStyles.x_axis_label,
                },
              }}
            />
            <VictoryLine
              style={{
                data: { stroke: linechartstyles.line_color },
                parent: { border: '1px solid #ccc' },
                labels: { fontFamily: fontFamily },
              }}
              data={data}
              labels={d => {
                if (linechartstyles.toggle_label) {
                  return d.y
                }
                return ''
              }}
              labelComponent={<VictoryLabel dy={15} />}
            />
          </VictoryChart>
        </Svg>
      )
    }

    if (
      typeof linechartdesc !== 'undefined' &&
      typeof linechartdesc !== 'null' &&
      linechartdesc.length !== 0
    ) {
      data = []
      for (let i = 0; i < linechartdesc.length; ++i) {
        let variables = linechartdesc[i]

        data.push({ x: variables.xaxis, y: variables.yaxis })
      }
    }
    if (this.state.width && !!linechartdesc) {
      return (
        <View>
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
              minDomain={{ y: 0 }}
              height={height}
            >
              <VictoryLabel
                text={linechartstyles.chart_title}
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
                text={linechartstyles.chart_subtitle}
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
                label={linechartstyles.y_axis_label}
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
                    if (t.length >= 14) {
                      return t.substring(0, 13)
                    }
                  }
                  return t
                }}
                label={linechartstyles.x_axis_label}
                style={{
                  axis: { stroke: '#9E9E9E' },
                  grid: { stroke: '#E0E0E0' },
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
                    padding: 25,
                    fill: '#9E9E9E',
                    ...customFontStyles.x_axis_label,
                  },
                }}
              />
              <VictoryLine
                style={{
                  data: { stroke: linechartstyles.line_color },
                  parent: { border: '1px solid #ccc' },
                  labels: { fontFamily: fontFamily },
                }}
                data={data}
                groupComponent={
                  <VictoryClipContainer clipPadding={{ top: 10, bottom: 10 }} />
                }
                labels={d => {
                  if (linechartstyles.toggle_label) {
                    return d.y
                  }
                  return ''
                }}
                labelComponent={<VictoryLabel dy={15} />}
              />
            </VictoryChart>
          </Svg>
        </View>
      )
    }
    return (
      <View
        style={{ flex: 1, alignSelf: 'stretch' }}
        onLayout={this.onLayout}
      ></View>
    )
  }
}
