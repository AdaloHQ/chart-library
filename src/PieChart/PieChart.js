import React from 'react'
import { PieChart as ChartKitPie } from '@adalo/react-native-chart-kit'
import { View, Text } from 'react-native'

const PieChart = props => {
  let {
    items,
    slices,
    prefixMode,
    _width,
    _height,
    editor,
    chartWidthPercentage,
    styles,
  } = props

  chartWidthPercentage = 50
  let showPercentages = false,
    showPrefix = true

  if (prefixMode === 1) {
    showPercentages = true
  }
  if (prefixMode === 2) {
    showPrefix = false
  }

  let {
    colorScheme,
    monochromaticScheme,
    customColor1,
    customColor2,
    customColor3,
    customColor4,
    customColor5,
    customColor6,
    numberOfSlices,
    otherSliceLabel,
  } = slices
  let legendEnabled = true
  if (chartWidthPercentage === 100) {
    legendEnabled = false
  }

  //set label styling based on  passed props
  let labelStyles = {}
  if (!editor) {
    labelStyles = {
      color: styles.label.color,
      fontFamily: styles.label.fontFamily,
      fontSize: styles.label.fontSize,
      fontWeight: styles.label.fontWeight,
    }
  }

  if (!items) {
    return <View></View>
  }
  let colors = [],
    otherSlices = [],
    otherValue = 0,
    data,
    otherObject,
    xOffset = 0,
    yOffset = 0

  if (colorScheme === 0) {
    //convert color to hsl and then get the light value
    //create an array of light values that will be used for the colors of the scheme

    if (monochromaticScheme) {
      let isHex = monochromaticScheme[0] === '#'
      if (!isHex) {
        monochromaticScheme = rgbaToHex(monochromaticScheme)
      }
    }

    let hslBase = hexToHSL(monochromaticScheme),
      lValue = getLValue(hslBase),
      lValues = [lValue]

    //create l values for a monochromatic scheme by creating an array of l values based on the base value
    let multiplier = 1
    const increment = (100 - lValue) / numberOfSlices
    for (let i = 0; i < numberOfSlices - 1; i++) {
      lValues.push(lValue + increment * multiplier)
      multiplier += 1
    }
    //generate colors array from hsl base and lValues
    colors = generateScheme(hslBase, lValues)
  } else if (colorScheme === 1) {
    //custom color scheme
    colors.push(customColor1)
    colors.push(customColor2)
    colors.push(customColor3)
    colors.push(customColor4)
    colors.push(customColor5)
    colors.push(customColor6)
  }

  //center the chart if the legend is turned off
  if (!legendEnabled) {
    xOffset = _width / 4 - 8
  }

  //sort items array big to little
  items.sort((a, b) => (a.sliceValue < b.sliceValue ? 1 : -1))

  if (numberOfSlices < items.length) {
    //subtract 1 to account for the other slice
    otherSlices = items.slice(numberOfSlices - 1, items.length)
    items = items.slice(0, numberOfSlices - 1)
  }

  otherSlices.forEach(slice => {
    otherValue += slice.sliceValue
  })

  if (editor) {
    //preview data
    data = []
    for (let i = 0; i < numberOfSlices - 1; i++) {
      let object = {
        name: items[0].label ? items[0].label : '',
        value: (numberOfSlices - i) * 10,
        color: colors[i],
        legendFontColor: labelStyles.color,
        legendFontSize: labelStyles.fontSize,
        legendFontFamily: labelStyles.fontFamily,
        legendFontWeight: labelStyles.fontWeight,
      }
      data.push(object)
    }
    let otherObject = {
      name: otherSliceLabel ? otherSliceLabel : '',
      value: 10,
      color: colors[numberOfSlices - 1],
      legendFontColor: labelStyles.color,
      legendFontSize: labelStyles.fontSize,
      legendFontFamily: labelStyles.fontFamily,
      legendFontWeight: labelStyles.fontWeight,
    }
    data.push(otherObject)
  } else {
    data = items.map((item, index) => {
      return {
        name: item.label,
        value: item.sliceValue,
        color: colors[index],
        legendFontColor: labelStyles.color,
        legendFontSize: labelStyles.fontSize,
        legendFontFamily: labelStyles.fontFamily,
        legendFontWeight: labelStyles.fontWeight,
        action: item.sliceAction,
      }
    })
  }

  //add the other slice if it exists
  if (otherValue > 0) {
    otherObject = {
      name: otherSliceLabel,
      value: otherValue,
      color: colors[numberOfSlices - 1],
      legendFontColor: labelStyles.color,
      legendFontSize: labelStyles.fontSize,
      legendFontFamily: labelStyles.fontFamily,
      legendFontWeight: labelStyles.fontWeight,
    }
    data.push(otherObject)
  }

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  }

  return (
    <ChartKitPie
      data={data}
      width={_width}
      height={_height}
      chartConfig={chartConfig}
      accessor={'value'}
      backgroundColor={'transparent'}
      center={[xOffset, yOffset]}
      absolute={!showPercentages}
      hasLegend={legendEnabled}
      avoidFalseZero
      chartWidthPercentage={chartWidthPercentage}
      showLabelPrefix={showPrefix}
      paddingLeft={16}
      editor={props.editor}
    />
  )
}

//hexToHSL function derived from https://css-tricks.com/converting-color-spaces-in-javascript/
const hexToHSL = hex => {
  let r = 0
  let g = 0
  let b = 0
  let a = 1

  r = '0x' + hex[1] + hex[2]
  g = '0x' + hex[3] + hex[4]
  b = '0x' + hex[5] + hex[6]

  //get alpha
  if (hex.length == 9) {
    a = '0x' + hex[7] + hex[8]
  }

  r /= 255
  g /= 255
  b /= 255

  let minColor = Math.min(r, g, b)
  let maxColor = Math.max(r, g, b)
  let diff = maxColor - minColor
  let h = 0
  let s = 0
  let l = 0

  if (diff === 0) {
    h = 0
  } else if (maxColor === r) {
    h = ((g - b) / diff) % 6
  } else if (maxColor === g) {
    h = (b - r) / diff + 2
  } else {
    h = (r - g) / diff + 4
  }

  h = Math.round(h * 60)
  if (h < 0) {
    h += 360
  }

  l = (maxColor + minColor) / 2
  s = diff == 0 ? 0 : diff / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  if (a !== 1) {
    a = (a / 255).toFixed(3)
  }

  return 'hsl(' + h + ',' + s + '%,' + l + '%,' + a + ')'
}

//rgbaToHex derived from https://css-tricks.com/converting-color-spaces-in-javascript/
const rgbaToHex = rgba => {
  let vals = rgba
    .split('(')
    .pop()
    .slice(0, -1)
    .replace(/\s/g, '')
    .split(',')
    .map((num, index) => {
      if (index === 3) {
        return parseFloat(num)
      } else {
        return parseInt(num)
      }
    })
  let r = vals[0],
    g = vals[1],
    b = vals[2],
    a = vals[3]

  r = r.toString(16)
  g = g.toString(16)
  b = b.toString(16)
  a = Math.round(a * 255).toString(16)

  if (r.length == 1) r = '0' + r
  if (g.length == 1) g = '0' + g
  if (b.length == 1) b = '0' + b
  if (a.length == 1) a = '0' + a

  return '#' + r + g + b + a
}

const getLValue = hsl => {
  return parseInt(hsl.split(',')[2].slice(0, -1))
}

const generateScheme = (hslBase, lValues) => {
  let splitBase = hslBase.split(',')
  let hslColors = []
  for (const lValue of lValues) {
    let color =
      splitBase[0] +
      ',' +
      splitBase[1] +
      ',' +
      lValue +
      '%' +
      ',' +
      splitBase[3]
    hslColors.push(color)
  }
  return hslColors
}

export default PieChart
