# Cryptocurrency Dashboard - Complete Implementation Guide

## Overview
Build a live Crypto Price Dashboard where users can select a cryptocurrency, view historical data in a table, and visualize price trends in a chart - exactly like Appsmith!

---

## 🎯 Goal

Create a dashboard that allows users to:
1. **Select a Cryptocurrency** (Bitcoin, Ethereum, Solana, Cardano)
2. **View historical price data** in a Table
3. **Visualize price trends** in a Chart

---

## 🧩 Widgets Used

| Widget | Name | Purpose |
|--------|------|---------|
| **Select** | `SelectCoin` | Dropdown to pick the cryptocurrency |
| **Table** | `PriceTable` | Displays historical price data |
| **Chart** | `PriceChart` | Plots price trend over time |

---

## 🌐 Public API Used

**API:** CoinGecko API (Free, No Auth Required)

**Base URL:**
```
https://api.coingecko.com/api/v3
```

**Endpoint:**
```
/coins/{id}/market_chart?vs_currency=usd&days=7
```

**Example Full URL:**
```
https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7
```

**Response Format:**
```json
{
  "prices": [
    [1704614400000, 45123.45],
    [1704700800000, 45540.30],
    ...
  ],
  "market_caps": [...],
  "total_volumes": [...]
}
```

Each price entry is: `[timestamp_in_milliseconds, price_in_usd]`

---

## ⚙️ Step-by-Step Setup

### 1️⃣ Select Widget: `SelectCoin`

**Configuration:**

1. Drag a **Select** component from the component library
2. Rename it to `SelectCoin`
3. Configure properties:

**Label:**
```
Select Cryptocurrency
```

**Placeholder:**
```
Choose a coin...
```

**Options:**
```javascript
[
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Ethereum", value: "ethereum" },
  { label: "Solana", value: "solana" },
  { label: "Cardano", value: "cardano" }
]
```

**Default Selected Value:**
```javascript
"bitcoin"
```

**Enable Search:**
```
true
```

---

### 2️⃣ API Setup: `getCoinData`

1. Go to the **APIs** panel
2. Click **+ Create API**
3. Configure:

**API Name:**
```
getCoinData
```

**Method:**
```
GET
```

**URL:**
```
https://api.coingecko.com/api/v3/coins/{{SelectCoin.selectedOptionValue}}/market_chart?vs_currency=usd&days=7
```

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

4. Click **Run** to test the API

**Important Notes:**
- The `{{SelectCoin.selectedOptionValue}}` will be replaced with the selected coin's value (e.g., "bitcoin")
- This makes the API URL dynamic based on the dropdown selection
- The API returns 7 days of hourly price data

---

### 3️⃣ Table Widget: `PriceTable`

**Configuration:**

1. Drag a **Table** component from the component library
2. Rename it to `PriceTable`
3. Configure properties:

**Table Data:**
```javascript
{{getCoinData.data.prices.map((item, index) => {
  return {
    Date: new Date(item[0]).toLocaleDateString(),
    Time: new Date(item[0]).toLocaleTimeString(),
    Price_USD: item[1].toFixed(2)
  }
})}}
```

**Explanation:**
- `getCoinData.data.prices` - Array of price data from API
- `.map()` - Transform each price entry
- `item[0]` - Timestamp in milliseconds
- `item[1]` - Price in USD
- `new Date(item[0])` - Convert timestamp to Date object
- `.toLocaleDateString()` - Format as readable date
- `.toLocaleTimeString()` - Format as readable time
- `.toFixed(2)` - Round price to 2 decimal places

**Other Settings:**
- **Enable Client Side Search:** `true`
- **Show Pagination:** `true`
- **Default Page Size:** `10`

---

### 4️⃣ Chart Widget: `PriceChart`

**Configuration:**

1. Drag a **Chart** component from the component library
2. Rename it to `PriceChart`
3. Configure properties:

**Title:**
```
7-Day Price Trend
```

**Chart Type:**
```
Line
```

**X-Axis Name:**
```
Date
```

**Y-Axis Name:**
```
Price (USD)
```

**Chart Series - Series 1:**

**Title:**
```
Price
```

**Color:**
```
#3b82f6
```

**Data:**
```javascript
{{getCoinData.data.prices.map(item => ({
  x: new Date(item[0]).toLocaleDateString(),
  y: item[1]
}))}}
```

**Explanation:**
- Transform API data to chart format `{x, y}`
- `x` - Date string for x-axis labels
- `y` - Price value for y-axis

**Other Settings:**
- **Show Data Labels:** `false` (too many points)
- **Show Legend:** `true`
- **Enable Tooltip:** `true`

---

### 5️⃣ Interaction: Connect Select to API

**On SelectCoin → onOptionChange Event:**

```javascript
{{runApi('getCoinData')}}
```

**Alternative (if runApi function is available in context):**
```javascript
{{getCoinData.run()}}
```

**What this does:**
- When user selects a different coin from dropdown
- The `onOptionChange` event triggers
- Runs the `getCoinData` API with the new selection
- Table and Chart automatically update with new data

---

## 🧠 Flow Summary

```
1. User opens dashboard
   └─> Bitcoin is selected by default (default value)

2. Page loads → API runs automatically
   └─> getCoinData fetches Bitcoin prices

3. Table displays:
   ├─> Date column (formatted dates)
   ├─> Time column (formatted times)
   └─> Price column (USD with 2 decimals)

4. Chart visualizes:
   └─> Line graph showing price trend over 7 days

5. User selects different coin (e.g., Ethereum)
   └─> onOptionChange triggers
       └─> getCoinData runs with new coin ID
           └─> Table and Chart update automatically
```

---

## ✅ Example Output

### Select Dropdown:
```
Select Cryptocurrency: [ Bitcoin ▼ ]
```

### Table View:
| Date | Time | Price (USD) |
|------|------|-------------|
| 01/10/2025 | 10:00:00 AM | 67,123.45 |
| 01/10/2025 | 11:00:00 AM | 67,540.30 |
| 01/10/2025 | 12:00:00 PM | 67,890.12 |
| 01/10/2025 | 01:00:00 PM | 68,123.78 |
| ... | ... | ... |

### Chart View:
```
📊 Line graph showing Bitcoin price fluctuations over 7 days
   - X-axis: Dates
   - Y-axis: Price in USD
   - Trend line showing price changes
```

---

## 🎨 Layout Suggestions

### Dashboard Layout:
```
┌─────────────────────────────────────────────────────────┐
│  Cryptocurrency Dashboard                                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Select Cryptocurrency: [ Bitcoin ▼ ]                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  7-Day Price Trend                              │    │
│  │  ┌─────────────────────────────────────────┐   │    │
│  │  │                                          │   │    │
│  │  │        Line Chart                        │   │    │
│  │  │                                          │   │    │
│  │  └─────────────────────────────────────────┘   │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Price History Table                            │    │
│  │  ┌───────┬──────────┬────────────┐            │    │
│  │  │ Date  │ Time     │ Price (USD)│            │    │
│  │  ├───────┼──────────┼────────────┤            │    │
│  │  │ 1/10  │ 10:00 AM │ 67,123.45  │            │    │
│  │  │ 1/10  │ 11:00 AM │ 67,540.30  │            │    │
│  │  └───────┴──────────┴────────────┘            │    │
│  │  [< Previous] Page 1 of 17 [Next >]           │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Advanced Features

### 1. Add Time Range Selector

Add another **Select** widget for different time ranges:

**Name:** `SelectTimeRange`

**Options:**
```javascript
[
  { label: "1 Day", value: "1" },
  { label: "7 Days", value: "7" },
  { label: "30 Days", value: "30" },
  { label: "90 Days", value: "90" },
  { label: "1 Year", value: "365" }
]
```

**Update API URL:**
```
https://api.coingecko.com/api/v3/coins/{{SelectCoin.selectedOptionValue}}/market_chart?vs_currency=usd&days={{SelectTimeRange.selectedOptionValue}}
```

### 2. Add Current Price Display

Add a **Text** widget:

**Text:**
```javascript
Current Price: ${{getCoinData.data.prices[getCoinData.data.prices.length - 1][1].toFixed(2)}}
```

### 3. Add Price Change Indicator

Add a **Text** widget:

**Text:**
```javascript
{{(() => {
  const prices = getCoinData.data.prices;
  const first = prices[0][1];
  const last = prices[prices.length - 1][1];
  const change = ((last - first) / first * 100).toFixed(2);
  return change > 0 ? `↑ +${change}%` : `↓ ${change}%`;
})()}}
```

### 4. Export Data Feature

Add a **Button** widget:

**Label:** `Export to CSV`

**onClick:**
```javascript
{{PriceTable.downloadData()}}
```

---

## 🐛 Troubleshooting

### Issue: Chart/Table shows "No data"
**Solution:**
1. Check if API has been run (click Run in APIs panel)
2. Verify API URL is correct
3. Check browser console for errors
4. Ensure CoinGecko API is accessible (not rate limited)

### Issue: API fails with CORS error
**Solution:**
CoinGecko API supports CORS. If you see CORS errors:
1. Try a different browser
2. Check if ad-blocker is interfering
3. Verify API endpoint is correct

### Issue: Select dropdown doesn't trigger API
**Solution:**
1. Verify `onOptionChange` event is configured
2. Check the event code: `{{runApi('getCoinData')}}`
3. Ensure API name matches exactly
4. Check browser console for event execution errors

### Issue: Table shows incorrect date/time format
**Solution:**
Use locale-specific formatting:
```javascript
Date: new Date(item[0]).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})
```

---

## 💡 Best Practices

1. **Set Default Values**
   - Always set a default value for Select widget
   - Ensures data loads on page open

2. **Handle Loading States**
   - Enable `animateLoading` on widgets
   - Shows user when data is being fetched

3. **Error Handling**
   - Check if `getCoinData.error` exists
   - Display error message to user

4. **Data Validation**
   - Check if `getCoinData.data` exists before mapping
   - Provide fallback empty array if no data

5. **Performance**
   - Limit table rows with pagination
   - Consider data caching for frequently selected coins

---

## 🚀 Quick Start Checklist

- [ ] Create Select widget named `SelectCoin`
- [ ] Configure Select options (Bitcoin, Ethereum, etc.)
- [ ] Create API named `getCoinData`
- [ ] Set API URL with dynamic coin parameter
- [ ] Test API by clicking Run
- [ ] Create Table widget named `PriceTable`
- [ ] Bind Table data with map transformation
- [ ] Create Chart widget named `PriceChart`
- [ ] Configure Chart series with price data
- [ ] Add `onOptionChange` event to Select
- [ ] Test by selecting different coins
- [ ] Verify Table and Chart update automatically

---

## 📚 Reference Properties

### SelectCoin
- `SelectCoin.selectedOptionValue` - Current coin ID (e.g., "bitcoin")
- `SelectCoin.selectedOptionLabel` - Current coin name (e.g., "Bitcoin")

### getCoinData
- `getCoinData.data` - API response data
- `getCoinData.data.prices` - Array of price data
- `getCoinData.isLoading` - Loading state
- `getCoinData.error` - Error message if failed

### PriceTable
- `PriceTable.selectedRow` - Currently selected row
- `PriceTable.tableData` - All table data
- `PriceTable.downloadData()` - Export table to CSV

### PriceChart
- `PriceChart.selectedDataPoint` - Clicked data point
- `PriceChart.chartData` - All chart data

---

## 🎓 Learning Points

This dashboard demonstrates:

1. **Dynamic API URLs** - Using component values in API endpoints
2. **Data Transformation** - Converting API format to widget format
3. **Event Handling** - Triggering API calls on user actions
4. **Reference Properties** - Accessing component state
5. **Real-time Updates** - Automatic data refresh on changes
6. **Professional UI** - Clean, functional dashboard layout

---

## 🔗 Additional Resources

- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)
- [Chart Component Documentation](./CHART_FEATURES.md)
- [JavaScript Date Formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

**Congratulations!** 🎉 You've built a professional cryptocurrency dashboard with live data, interactive charts, and dynamic filtering - just like Appsmith!
