# Advanced Custom Function Component Guide

## Overview
The Custom Function component is a powerful tool that allows you to create fully customized UI elements with HTML, CSS, and JavaScript. Unlike Appsmith's basic custom widgets, this implementation provides **full context access** to all components, APIs, queries, and application state.

## Key Features

### 1. **Full Context Access**
Access everything in your application:
- **Components** - Read and update any component's props
- **APIs** - Access API responses, loading states, and errors
- **Queries** - Access SQL query results and states
- **State Management** - Both local and global state
- **Utility Functions** - Built-in helper functions

### 2. **Reactive State Management**
- Local state specific to the custom function
- Global application state (Appsmith-style)
- Automatic re-renders on state changes

### 3. **Split-View Code Editor**
- Write code on the left, see live preview on the right
- Separate tabs for HTML, CSS, and JavaScript
- Real-time preview updates
- Line and character count

### 4. **Advanced Debugging**
- Better error messages with stack traces
- Console logging support
- Context inspection tools

## Available Context

When you write JavaScript in a Custom Function, you have access to these variables:

### `components`
Access all components on the canvas by their ID:

```javascript
// Read component data
console.log(components.Button1.props);
console.log(components.Input1.props.defaultText);

// Update component props
components.Button1.update({ label: "New Label" });
components.Input1.update({ defaultText: "New Value" });
```

### `apis`
Access all API endpoints:

```javascript
// Check API status
if (apis.getUsersAPI.isLoading) {
  console.log("Loading...");
}

// Access API response data
const users = apis.getUsersAPI.data;
console.log(users);

// Check for errors
if (apis.getUsersAPI.error) {
  console.error("API Error:", apis.getUsersAPI.error);
}
```

### `queries`
Access all SQL queries:

```javascript
// Get query results
const results = queries.GetUsers.data;
console.log(results);

// Check loading state
if (queries.GetUsers.isLoading) {
  console.log("Query running...");
}
```

### `state`
Local state for this custom function only:

```javascript
// Read local state
console.log(state.counter);

// Update local state (triggers re-render)
setState({ counter: (state.counter || 0) + 1 });
```

### `appsmith`
Global application state (like Appsmith):

```javascript
// Read global state
console.log(appsmith.store.username);

// Update global state
appsmith.updateStore("username", "John Doe");
appsmith.updateStore("theme", "dark");
```

### `props`
Props passed to this custom function:

```javascript
// Access custom props
console.log(props.title);
console.log(props.config);
```

### `utils`
Utility functions:

```javascript
// Show alert
utils.showAlert("Hello World!");

// Navigate to URL
utils.navigateTo("https://example.com");

// Copy to clipboard
utils.copyToClipboard("Text to copy");

// Download data as JSON
utils.downloadData({ name: "John" }, "data.json");
```

## Usage Examples

### Example 1: Display API Data

**HTML:**
```html
<div class="api-viewer">
  <h3>User List</h3>
  <div id="user-list"></div>
  <button onclick="refreshData()">Refresh</button>
</div>
```

**CSS:**
```css
.api-viewer {
  padding: 20px;
  background: #f0f9ff;
  border-radius: 8px;
}

.user-card {
  padding: 10px;
  margin: 8px 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

**JavaScript:**
```javascript
function displayUsers() {
  const container = document.getElementById("user-list");

  if (apis.getUsersAPI.isLoading) {
    container.innerHTML = "<p>Loading...</p>";
    return;
  }

  if (apis.getUsersAPI.error) {
    container.innerHTML = `<p style="color: red;">Error: ${apis.getUsersAPI.error}</p>`;
    return;
  }

  const users = apis.getUsersAPI.data?.data || [];

  container.innerHTML = users.map(user => `
    <div class="user-card">
      <strong>${user.first_name} ${user.last_name}</strong>
      <br>
      <small>${user.email}</small>
    </div>
  `).join("");
}

function refreshData() {
  // Trigger API refresh by updating a component
  // or using your API trigger mechanism
  console.log("Refreshing...");
  displayUsers();
}

// Initial display
displayUsers();
```

### Example 2: Interactive Counter with State

**HTML:**
```html
<div class="counter-widget">
  <h2>Counter Widget</h2>
  <div class="counter-display" id="counter">0</div>
  <div class="button-group">
    <button onclick="decrement()">-</button>
    <button onclick="reset()">Reset</button>
    <button onclick="increment()">+</button>
  </div>
</div>
```

**CSS:**
```css
.counter-widget {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.counter-display {
  font-size: 72px;
  font-weight: bold;
  margin: 20px 0;
}

.button-group button {
  margin: 0 5px;
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.button-group button:hover {
  transform: scale(1.1);
}
```

**JavaScript:**
```javascript
function updateDisplay() {
  const count = state.count || 0;
  document.getElementById("counter").textContent = count;

  // Save to global state too
  appsmith.updateStore("counterValue", count);
}

function increment() {
  const newCount = (state.count || 0) + 1;
  setState({ count: newCount });
  updateDisplay();
}

function decrement() {
  const newCount = (state.count || 0) - 1;
  setState({ count: newCount });
  updateDisplay();
}

function reset() {
  setState({ count: 0 });
  updateDisplay();
}

// Initialize
updateDisplay();
```

### Example 3: Component Interaction

**JavaScript:**
```javascript
// Read input value from another component
const searchTerm = components.SearchInput1?.props?.defaultText || "";

// Update button label based on API state
if (apis.searchAPI.isLoading) {
  components.SearchButton1.update({ label: "Searching..." });
} else {
  components.SearchButton1.update({ label: "Search" });
}

// Display results count
const resultCount = apis.searchAPI.data?.length || 0;
document.getElementById("result-count").textContent =
  `Found ${resultCount} results`;
```

### Example 4: Data Visualization

**HTML:**
```html
<div class="chart-container">
  <h3>Sales by Category</h3>
  <div id="chart"></div>
</div>
```

**JavaScript:**
```javascript
function renderChart() {
  const data = queries.SalesQuery.data || [];
  const chartEl = document.getElementById("chart");

  if (!data.length) {
    chartEl.innerHTML = "<p>No data available</p>";
    return;
  }

  // Simple bar chart with HTML/CSS
  const maxValue = Math.max(...data.map(d => d.value));

  chartEl.innerHTML = data.map(item => `
    <div style="margin: 8px 0;">
      <div style="display: flex; align-items: center;">
        <span style="width: 100px;">${item.category}</span>
        <div style="flex: 1; height: 30px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); width: ${(item.value / maxValue) * 100}%; border-radius: 4px; display: flex; align-items: center; padding: 0 8px; color: white; font-weight: bold;">
          ${item.value}
        </div>
      </div>
    </div>
  `).join("");
}

renderChart();
```

## Best Practices

1. **Always Check for Null/Undefined**
   ```javascript
   const data = apis.myAPI?.data || [];
   ```

2. **Handle Loading States**
   ```javascript
   if (apis.myAPI.isLoading) {
     return "Loading...";
   }
   ```

3. **Use Try-Catch for Safety**
   ```javascript
   try {
     // Your code
   } catch (error) {
     console.error("Error:", error);
   }
   ```

4. **Initialize on Load**
   ```javascript
   // Put initialization code at the end
   function init() {
     // Setup code
   }

   init();
   ```

5. **Use Console for Debugging**
   ```javascript
   console.log("Context:", { components, apis, queries, state });
   ```

## Advanced Patterns

### Pattern 1: Reactive Updates
```javascript
// Listen for API changes and auto-update
setInterval(() => {
  if (apis.myAPI.data) {
    updateDisplay();
  }
}, 1000);
```

### Pattern 2: Form Builder
```javascript
function buildForm(fields) {
  return fields.map(field => `
    <div class="field">
      <label>${field.label}</label>
      <input type="${field.type}" id="${field.id}" />
    </div>
  `).join("");
}

document.getElementById("form-container").innerHTML =
  buildForm(props.formConfig || []);
```

### Pattern 3: State Persistence
```javascript
// Save to global state for persistence
function saveState() {
  appsmith.updateStore(`customWidget_${props.id}`, state);
}

// Load from global state
function loadState() {
  const saved = appsmith.store[`customWidget_${props.id}`];
  if (saved) {
    setState(saved);
  }
}

loadState();
```

## Comparison with Appsmith

| Feature | This Implementation | Appsmith |
|---------|-------------------|----------|
| Component Access | ✅ Full read/write | ✅ Yes |
| API Access | ✅ Full access | ✅ Yes |
| Query Access | ✅ Full access | ✅ Yes |
| Local State | ✅ Yes | ❌ No |
| Global State | ✅ Yes (appsmith.store) | ✅ Yes |
| Utility Functions | ✅ Built-in | ⚠️ Limited |
| Live Preview | ✅ Split-view editor | ⚠️ Basic |
| Error Handling | ✅ Enhanced | ⚠️ Basic |
| Context Injection | ✅ Automatic | ⚠️ Manual |

## Tips & Tricks

- Type `console.log(components)` to see all available components
- Type `console.log(apis)` to see all API responses
- Use the "Show Context" button in the default widget to explore available data
- Changes to HTML/CSS/JS automatically trigger re-renders
- Local state persists during the session but not between refreshes
- Global state (appsmith.store) can persist if you implement storage

## Common Issues

**Issue: "Cannot read property of undefined"**
- Always use optional chaining: `apis.myAPI?.data`

**Issue: "setState is not updating the UI"**
- Make sure you're calling `setState()` as a function
- The UI updates when HTML elements change

**Issue: "API data not showing"**
- Check if the API has been executed (click Run)
- Check loading state: `apis.myAPI.isLoading`
- Check for errors: `apis.myAPI.error`

## Need Help?

Check the console for detailed error messages and context information. The Custom Function component provides extensive logging to help debug issues.
