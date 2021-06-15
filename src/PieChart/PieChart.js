import React from 'react'
import { PieChart as ChartKitPie } from 'react-native-chart-kit'

//TODO: click action, issues caused by library limitation (label font weight, label wrapping), refactoring

const PieChart = props => {
  console.log(props)
  let { items, slices, legend, _width, _height, editor, styles, sliceAction } =
    props
  let {
    numberOfSlices,
    otherSliceLabel,
    colorScheme,
    monochromaticScheme,
    customColor1,
    customColor2,
    customColor3,
    customColor4,
    customColor5,
    customColor6,
  } = slices
  let legendEnabled = true
  //TODO: check if we should keep this prop
  let { absoluteNumbers } = legend
  //set label styling based on editor or passed props
  let labelStyles
  if (editor) {
    labelStyles = {
      color: '#7e7e7e',
      fontFamily: 'inherit',
      fontSize: 15,
      fontWeight: 600,
    }
  } else {
    labelStyles = styles.sliceLabel
  }

  if (!items) {
    items = []
  }
  let colors = [],
    otherSlices = [],
    otherValue = 0,
    data,
    otherObject,
    xOffset = 0,
    yOffset = 0,
    width = _width
  const colorIncrement = 10

  if (legendEnabled) {
    _height = _width / 1.62
  } else {
    _height = width
  }

  if (colorScheme === 0) {
    let hslBase = hexToHSL(monochromaticScheme),
      lValue = getLValue(hslBase),
      lValues = [lValue],
      upCount = 0,
      downCount = 0
    const possibleUp = (100 - lValue) / colorIncrement
    const possibleDown = lValue / colorIncrement

    let multiplier = 1
    for (let i = 0; i < numberOfSlices - 1; i++) {
      if (i % 2 === 0) {
        // go down
        if (downCount <= possibleDown) {
          lValues.push(lValue - colorIncrement * multiplier)
        } else {
          lValues.push(lValue + colorIncrement * multiplier)
          multiplier += 1
        }
      } else {
        // go up
        if (upCount <= possibleUp) {
          lValues.push(lValue + colorIncrement * multiplier)
        } else {
          lValues.push(lValue - colorIncrement * multiplier)
        }
        multiplier += 1
      }
    }
    lValues.sort((a, b) => (a > b ? 1 : -1))
    //generate colors array from hsl base and lValues
    colors = generateScheme(hslBase, lValues)
  } else if (colorScheme === 1) {
    //custom color scheme
    //TODO: refactor this?
    colors.push(customColor1)
    colors.push(customColor2)
    colors.push(customColor3)
    colors.push(customColor4)
    colors.push(customColor5)
    colors.push(customColor6)
  }

  //center the chart if the legend is turned off
  if (!legendEnabled) {
    xOffset = _width / 4
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
    data = [
      {
        name: 'Item 1',
        value: 12,
        color: colors[0],
        legendFontColor: labelStyles.color,
        legendFontSize: labelStyles.fontSize,
      },
      {
        name: 'Item 2',
        value: 22,
        color: colors[1],
        legendFontColor: labelStyles.color,
        legendFontSize: labelStyles.fontSize,
      },
      {
        name: otherSliceLabel,
        value: 10,
        color: colors[2],
        legendFontColor: labelStyles.color,
        legendFontSize: labelStyles.fontSize,
      },
    ]
  } else {
    data = items.map((item, index) => {
      return {
        name: item.sliceLabel,
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
    let otherItem = {
      id: numberOfSlices,
      sliceValue: otherValue,
      name: otherSliceLabel,
    }
    otherObject = {
      name: otherSliceLabel,
      value: otherValue,
      color: colors[numberOfSlices - 1],
      legendFontColor: labelStyles.color,
      legendFontSize: labelStyles.fontSize,
      legendFontFamily: labelStyles.fontFamily,
      legendFontWeight: labelStyles.fontWeight,
      // action: oh,
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
      absolute={absoluteNumbers}
      hasLegend={legendEnabled}
      avoidFalseZero
    />
  )
  i
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
