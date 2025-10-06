# Quick Reference Guide - Appsmith-like Features

## Chart Component

### Reference Properties
Access chart data programmatically:
```javascript
Chart1.chartData              // Full chart data for all series
Chart1.selectedDataPoint      // Currently selected data point
Chart1.selectedDataPoint.x    // Label of selected point
Chart1.selectedDataPoint.y    // Value of selected point
Chart1.xAxisName              // X-axis label
Chart1.yAxisName              // Y-axis label
```

### Data Binding
```javascript
// Simple binding
{{apiName.data}}

// Map transformation
{{apiName.data.map(item => ({x: item.label, y: item.value}))}

// Filtered data
{{apiName.data.filter(item => item.active).map(item => ({x: item.name, y: item.count}))}

// Top 10
{{apiName.data.sort((a, b) => b.value - a.value).slice(0, 10).map(item => ({x: item.name, y: item.value}))}
```

### Events
```javascript
// onDataPointClick
{{console.log(`Selected: ${x} = ${y}`)}}
{{Table1.setSelectedRow(rawData)}}
{{navigateTo(`/details/${x}`)}}
```

---

## Select Component

### Reference Properties
```javascript
SelectCoin.selectedOptionValue    // Current selected value
SelectCoin.selectedOptionLabel    // Current selected label
SelectCoin.selectedOptionValues   // Array of values (multi-select)
SelectCoin.selectedOptions        // Array of option objects
```

### Configuration
```javascript
// Options
[
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Ethereum", value: "ethereum" }
]

// Default value
"bitcoin"
```

### Events
```javascript
// onOptionChange - trigger API reload
{{runApi('getCoinData')}}
{{getCoinData.run()}}
```

---

## Table Component

### Data Binding
```javascript
// From API with transformation
{{getCoinData.data.prices.map((item, index) => ({
  Date: new Date(item[0]).toLocaleDateString(),
  Time: new Date(item[0]).toLocaleTimeString(),
  Price_USD: item[1].toFixed(2)
}))}
```

### Reference Properties
```javascript
PriceTable.selectedRow      // Currently selected row
PriceTable.tableData        // All table data
```

---

## API Component

### Dynamic URL
```javascript
// Use component values in URL
https://api.example.com/coins/{{SelectCoin.selectedOptionValue}}/data

// With parameters
https://api.example.com/data?coin={{SelectCoin.selectedOptionValue}}&days={{SelectTimeRange.selectedOptionValue}}
```

### Reference Properties
```javascript
getCoinData.data              // Response data
getCoinData.data.prices       // Nested data
getCoinData.isLoading         // Loading state
getCoinData.error             // Error message
getCoinData.response.status   // HTTP status
getCoinData.response.headers  // Response headers
```

---

## Common Patterns

### Cryptocurrency Dashboard
```javascript
// Select Component
Options: [
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Ethereum", value: "ethereum" }
]
Default: "bitcoin"
onOptionChange: {{runApi('getCoinData')}}

// API
URL: https://api.coingecko.com/api/v3/coins/{{SelectCoin.selectedOptionValue}}/market_chart?vs_currency=usd&days=7

// Table
Data: {{getCoinData.data.prices.map(item => ({
  Date: new Date(item[0]).toLocaleDateString(),
  Time: new Date(item[0]).toLocaleTimeString(),
  Price: item[1].toFixed(2)
}))}}

// Chart
Data: {{getCoinData.data.prices.map(item => ({
  x: new Date(item[0]).toLocaleDateString(),
  y: item[1]
}))}}
```

### Sales Dashboard
```javascript
// Filter by region
Chart Data: {{salesAPI.data
  .filter(item => item.region === Select1.selectedOptionValue)
  .map(item => ({x: item.product, y: item.sales}))}}

// Top performers
Chart Data: {{salesAPI.data
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10)
  .map(item => ({x: item.name, y: item.revenue}))}}

// Grouped by category
Chart Data: {{Object.entries(
  salesAPI.data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.value;
    return acc;
  }, {})
).map(([x, y]) => ({x, y}))}}
```

---

## Available Chart Types

1. **Column** - Vertical bars
2. **Bar** - Horizontal bars
3. **Line** - Connected line graph
4. **Area** - Filled area under line
5. **Pie** - Circular percentage
6. **Custom** - ECharts configuration

---

## Mustache Syntax

### Basic
```javascript
{{apiName.data}}
{{componentName.propertyName}}
{{globalState.variableName}}
```

### Array Methods
```javascript
{{array.map(item => expression)}}
{{array.filter(item => condition)}}
{{array.slice(start, end)}}
{{array.sort((a, b) => expression)}}
{{array.reduce((acc, item) => expression, initial)}}
```

### Ternary
```javascript
{{condition ? valueIfTrue : valueIfFalse}}
```

### IIFE
```javascript
{{(() => {
  // Multi-line JavaScript
  const result = calculation();
  return result;
})()}}
```

---

## Event Context Variables

### Chart onDataPointClick
```javascript
x              // X-axis value
y              // Y-axis value
seriesTitle    // Series name
rawData        // Full data point
```

### Select onOptionChange
```javascript
selectedOption        // Selected value
selectedOptions       // Array of values (multi)
selectedOptionLabel   // Label text
```

---

## Best Practices

1. **Always run APIs first** before binding
2. **Use consistent formats** - {x, y} for charts
3. **Handle null values** - filter before mapping
4. **Set default values** for selects
5. **Enable tooltips** for better UX
6. **Use reference properties** for component interaction
7. **Test transformations** with console.log
8. **Provide loading states** during API calls

---

## Debugging

```javascript
// Check API response
{{console.log(apiName.response)}}

// Check transformed data
{{console.log(apiName.data.map(...))}}

// Check component state
{{console.log(Chart1.selectedDataPoint)}}
{{console.log(Select1.selectedOptionValue)}}

// Check available APIs
{{console.log(Object.keys(apis))}}
```

---

## Documentation Files

- `CHART_FEATURES.md` - Complete chart documentation
- `CRYPTO_DASHBOARD_GUIDE.md` - Cryptocurrency dashboard tutorial
- `QUICK_REFERENCE.md` - This file

---

This reference provides quick access to the most commonly used patterns and features for building Appsmith-like dashboards!
