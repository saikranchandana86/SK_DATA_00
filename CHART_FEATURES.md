# Chart Component - Complete Appsmith-like Functionality

## Overview
The Chart component provides comprehensive data visualization capabilities matching Appsmith's functionality, including mustache syntax binding, multiple chart types, interactive events, and reference properties.

---

## Core Binding Functionality

### 1. Basic Data Binding with Mustache Syntax
Charts use mustache syntax (double curly braces `{{ }}`) to dynamically bind API responses or query results.

**Example:**
```javascript
{{fetchData.data}}
```

### 2. Expected Data Format
For built-in charts (Line, Bar, Pie, Column, Area), data should follow this structure:
```javascript
[
  { "x": "Product1", "y": 20000 },
  { "x": "Product2", "y": 15000 },
  { "x": "Product3", "y": 30000 }
]
```
Where `x` is the label and `y` is the value.

### 3. Data Transformation
Transform query data to the expected format using the `map()` function:
```javascript
{{fetchUserData.data.map(p => ({x: p.gender, y: p.count}))}}
```

---

## Chart Types Supported

### Built-in Charts
1. **Column Chart** - Vertical bars (default)
2. **Bar Chart** - Horizontal bars
3. **Line Chart** - Connected line graph
4. **Area Chart** - Filled area under line
5. **Pie Chart** - Circular percentage visualization
6. **Custom EChart** - Full ECharts configuration support

### Custom ECharts Configuration
Embed chart code using mustache syntax in the Custom EChart Configuration property:
```javascript
{
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: {{Query1.data}},  // Dynamic binding
      type: 'line'
    }
  ]
}
```

---

## Key Features

### 4. Multiple Series Support
Add multiple chart series to display different datasets with customizable colors and labels.

**Example:**
- **Series 1 (2023):** `{{salesData.data.map(item => ({x: item.month, y: item.revenue2023}))}}`
- **Series 2 (2024):** `{{salesData.data.map(item => ({x: item.month, y: item.revenue2024}))}}`

### 5. Interactive Events

#### onDataPointClick Event
Execute actions when users click on data points.

**Available variables in the event handler:**
- `x` - The x-axis value (label)
- `y` - The y-axis value (data point value)
- `seriesTitle` - The name of the series
- `rawData` - The complete data point object

**Example usage:**
```javascript
// Show alert with selected data
{{console.log(`Selected: ${x} = ${y}`)}}

// Update another component
{{Table1.setSelectedRow(rawData)}}

// Navigate to detail page
{{navigateTo(`/details/${x}`)}}
```

### 6. Reference Properties
Access chart data programmatically using reference properties:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `Chart1.chartData` | Array | Full chart data for all series | `{{Chart1.chartData}}` |
| `Chart1.selectedDataPoint` | Object | Currently selected data point | `{{Chart1.selectedDataPoint.x}}` |
| `Chart1.selectedDataPoint.x` | String/Number | Label of selected point | `{{Chart1.selectedDataPoint.x}}` |
| `Chart1.selectedDataPoint.y` | Number | Value of selected point | `{{Chart1.selectedDataPoint.y}}` |
| `Chart1.xAxisName` | String | X-axis label | `{{Chart1.xAxisName}}` |
| `Chart1.yAxisName` | String | Y-axis label | `{{Chart1.yAxisName}}` |

**Example - Display selected data point:**
```javascript
// In a Text component
Selected Product: {{Chart1.selectedDataPoint.x}}
Sales: ${{Chart1.selectedDataPoint.y}}
```

---

## Configuration Options

### General Settings
- **Title** - Chart header text
- **Chart Type** - Column, Bar, Line, Area, Pie, Custom
- **X-Axis Name** - Label for x-axis
- **Y-Axis Name** - Label for y-axis
- **Show Data Labels** - Display values on data points
- **Show Legend** - Display series legend
- **Legend Position** - Top, Bottom, Left, Right
- **Enable Tooltip** - Show value on hover
- **Visible** - Show/hide chart

### Style Settings
- **Label Orientation** - Auto, Horizontal, Vertical, Slant
- **Label Text Size** - Font size for labels
- **Grid Line Color** - Color of grid lines
- **Background Color** - Chart background
- **Border Color** - Chart border color
- **Border Width** - Border thickness
- **Border Radius** - Corner rounding

### Data Binding (Chart Series)
Configure multiple series with:
- **Title** - Series name
- **Color** - Series color
- **Data** - Data binding expression

---

## Security with Prepared Statements
When binding database queries, the system uses prepared statements by default to protect against SQL injection by pre-compiling SQL queries and executing them with different parameters.

---

## Usage Examples

### Example 1: Simple Single-Series Chart
**API Response:**
```json
{
  "status": "success",
  "data": [
    { "month": "Jan", "revenue": 45000 },
    { "month": "Feb", "revenue": 52000 },
    { "month": "Mar", "revenue": 48000 }
  ]
}
```

**Chart Binding:**
```javascript
{{getSalesData.data.map(item => ({x: item.month, y: item.revenue}))}
```

### Example 2: Filtered Data
```javascript
{{getUsersAPI.data
  .filter(user => user.status === "active")
  .map(user => ({x: user.name, y: user.score}))}}
```

### Example 3: Multiple Series (Comparison)
**Series 1 - Revenue:**
```javascript
{{monthlyData.data.map(item => ({x: item.month, y: item.revenue}))}
```

**Series 2 - Orders:**
```javascript
{{monthlyData.data.map(item => ({x: item.month, y: item.orders}))}
```

### Example 4: Top 10 Performers
```javascript
{{salesAPI.data
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10)
  .map(item => ({x: item.salesperson, y: item.revenue}))}}
```

### Example 5: Aggregated/Grouped Data
```javascript
{{Object.entries(
  salesAPI.data.reduce((acc, sale) => {
    const category = sale.category;
    acc[category] = (acc[category] || 0) + sale.amount;
    return acc;
  }, {})
).map(([x, y]) => ({x, y}))}}
```

### Example 6: Date Formatting
```javascript
{{salesAPI.data.map(item => ({
  x: new Date(item.timestamp).toLocaleDateString(),
  y: item.amount
}))}}
```

### Example 7: Dynamic Filtering with Component
Bind to another component's value (e.g., a Select dropdown):
```javascript
{{salesAPI.data
  .filter(item => item.region === Select1.selectedValue)
  .map(item => ({x: item.product, y: item.sales}))}}
```

---

## Custom EChart Configuration - Advanced Example

### Dual-Axis Chart (Bar + Line)
```javascript
{
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {
    data: ['Revenue', 'Orders']
  },
  xAxis: {
    type: 'category',
    data: {{salesData.data.map(item => item.month)}}
  },
  yAxis: [
    {
      type: 'value',
      name: 'Revenue ($)',
      position: 'left'
    },
    {
      type: 'value',
      name: 'Orders',
      position: 'right'
    }
  ],
  series: [
    {
      name: 'Revenue',
      type: 'bar',
      data: {{salesData.data.map(item => item.revenue)}}
    },
    {
      name: 'Orders',
      type: 'line',
      yAxisIndex: 1,
      data: {{salesData.data.map(item => item.orders)}}
    }
  ]
}
```

---

## Interactive Features

### Built-in Actions
1. **Export Data** - Download chart data as CSV
2. **Refresh** - Reload chart data
3. **Fullscreen** - Expand chart view
4. **Hover Effects** - Visual feedback on data points
5. **Tooltips** - Show values on hover

### Event Handling Examples

**Navigate on click:**
```javascript
{{navigateTo(`/product/${selectedDataPoint.x}`)}}
```

**Update global state:**
```javascript
{{updateGlobalState('selectedProduct', selectedDataPoint.x)}}
```

**Show modal with details:**
```javascript
{{Modal1.show(); Table1.setData(selectedDataPoint.rawData)}}
```

**Chain actions:**
```javascript
{{
  console.log('Selected:', selectedDataPoint.x);
  updateGlobalState('selection', selectedDataPoint);
  RefreshQuery1.run();
}}
```

---

## Advanced Data Handling

### Supported Data Formats
1. **Standard format:** `[{x: "A", y: 10}, {x: "B", y: 20}]`
2. **Named fields:** `[{label: "A", value: 10}, {name: "B", count: 20}]`
3. **Simple arrays:** `[10, 20, 30, 40]`
4. **Object format:** `{"Product A": 100, "Product B": 150}`

### Automatic Type Conversion
- String values are automatically converted to numbers for y-axis
- Missing x/y properties use fallback fields (label, name, value, count)
- Array indices used as x-values if no label provided

---

## Error Handling

### Chart Shows "No Chart Data"
**Causes:**
- API/Query hasn't been executed
- Data transformation returns empty array
- Data format doesn't match expected structure

**Solutions:**
1. Run the API/Query first
2. Check console for evaluation errors
3. Verify data transformation with `{{console.log(yourData)}}`
4. Ensure y-values are numbers

### Common Debugging Steps
1. Check if API has response: `{{console.log(apiName.response)}}`
2. Verify data structure: `{{console.log(apiName.data)}}`
3. Test transformation: `{{console.log(apiName.data.map(...))}}`
4. Check for null values: `{{apiName.data.filter(item => item.value !== null)}}`

---

## Sample API for Testing

### Monthly Sales API
**Endpoint:** `https://api.example.com/sales/monthly`
**Method:** GET

**Response:**
```json
{
  "status": "success",
  "data": [
    { "month": "Jan", "revenue": 45000, "orders": 120 },
    { "month": "Feb", "revenue": 52000, "orders": 145 },
    { "month": "Mar", "revenue": 48000, "orders": 132 },
    { "month": "Apr", "revenue": 61000, "orders": 168 },
    { "month": "May", "revenue": 58000, "orders": 152 },
    { "month": "Jun", "revenue": 72000, "orders": 195 }
  ]
}
```

**Usage in Chart:**
```javascript
// Single series - Revenue
{{getSalesData.data.map(item => ({x: item.month, y: item.revenue}))}

// Or for Orders
{{getSalesData.data.map(item => ({x: item.month, y: item.orders}))}
```

---

## Best Practices

1. **Always run APIs/Queries first** before binding to charts
2. **Use consistent data formats** - stick to {x, y} structure
3. **Handle missing data** - filter out null/undefined values
4. **Optimize performance** - limit data points for large datasets (use slice/filter)
5. **Use meaningful labels** - provide clear x-axis values
6. **Choose appropriate chart types:**
   - Bar/Column: Comparisons between categories
   - Line/Area: Trends over time
   - Pie: Part-to-whole relationships
7. **Test transformations** - verify with console.log before binding
8. **Use reference properties** - access chart data in other components
9. **Enable tooltips** - improve user experience
10. **Handle errors gracefully** - provide default/fallback data

---

## Quick Start Guide

### Setup Steps:

1. **Create an API:**
   - Go to APIs panel
   - Add new API
   - Configure endpoint and method
   - Click "Run" to test

2. **Add Chart Widget:**
   - Drag Chart from component library
   - Select chart type

3. **Bind Data:**
   - Click on the chart
   - Open Properties → Data → Chart series
   - Type `{{` to see autocomplete
   - Enter binding expression
   - Example: `{{apiName.data.map(item => ({x: item.label, y: item.value}))}}`

4. **Customize:**
   - Set title, axis names
   - Choose colors for series
   - Configure legend and tooltips
   - Add event handlers if needed

5. **Test:**
   - Click data points to test events
   - Export data to verify formatting
   - Check reference properties in other components

---

## Troubleshooting Guide

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| No data displayed | API not run | Click "Run" in APIs panel |
| Empty chart | Wrong data format | Ensure format is `[{x, y}]` |
| Autocomplete not working | Wrong syntax | Type `{{` to trigger |
| Values showing as 0 | String instead of number | Convert: `y: Number(item.value)` |
| Labels cut off | Long text | Set labelOrientation to 'vertical' or 'slant' |
| Event not firing | Wrong syntax | Check onDataPointClick code |
| Reference property undefined | Chart not selected | Click a data point first |

---

This comprehensive implementation matches Appsmith's chart functionality, providing a powerful and flexible data visualization system with seamless API integration, dynamic data binding, interactive events, and programmatic access through reference properties.
