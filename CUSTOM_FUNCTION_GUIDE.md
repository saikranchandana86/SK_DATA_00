# Custom Function Component Guide

## Overview
The Custom Function component allows you to create fully customized UI elements using HTML, CSS, and JavaScript.

## Features

### 1. **Large Code Editor Modal**
- Click on any of the code buttons (HTML, CSS, or JavaScript) to open a full-screen code editor
- Each editor opens in a dedicated modal with plenty of space for writing code
- Monaco editor with syntax highlighting, auto-completion, and code formatting

### 2. **Smooth Resizing**
- Resize the component on the canvas by dragging the resize handles
- Smooth, real-time resizing without lag or transitions
- Component content automatically adjusts to the new size

### 3. **Live Preview**
- See your code come to life in preview mode
- Custom HTML structure
- Custom CSS styling
- Interactive JavaScript functionality

## How to Use

### Adding a Custom Function Component
1. Drag the "Custom Function" component from the component library to the canvas
2. Select the component to view its properties panel

### Editing Code
1. In the Properties Panel, you'll see three buttons:
   - **HTML** - Edit your HTML structure
   - **CSS** - Edit your styles
   - **JavaScript** - Add interactivity

2. Click any button to open the full-screen code editor modal
3. Write or paste your code
4. Click "Save Changes" to apply your code
5. Click "Cancel" to discard changes

### Resizing on Canvas
1. Select the component on the canvas
2. Drag any of the resize handles (corners or edges)
3. The component will resize smoothly in real-time
4. The content will automatically scale to fit

### Preview Mode
1. Click the "Preview" button in the top bar
2. Your custom component will render with all HTML, CSS, and JavaScript
3. Interactive elements (buttons, inputs, etc.) will be fully functional

## Example Use Cases

### 1. Custom Dashboard Widget
Create a beautiful metric card with animations and real-time updates.

### 2. Interactive Form
Build a custom form with validation, animations, and unique styling.

### 3. Data Visualization
Create custom charts or visualizations using libraries or custom code.

### 4. Third-Party Integrations
Embed widgets from external services (maps, calendars, social feeds, etc.).

## Tips

- **Line Count Display**: The properties panel shows how many lines of code you have in each section
- **Auto-Save**: Changes are only saved when you click "Save Changes" in the modal
- **Console Access**: Use `console.log()` in your JavaScript to debug
- **Scoped CSS**: Your CSS is automatically scoped to your component to avoid conflicts
- **Error Handling**: JavaScript errors are caught and displayed in the component

## Default Example

The component comes with a pre-built example that demonstrates:
- HTML structure with a title, description, button, and output area
- CSS with gradient background, hover effects, and modern styling
- JavaScript with click handler and dynamic content updates

Try customizing this example to learn how the component works!

## Best Practices

1. **Keep Code Organized**: Use comments to document your code
2. **Test Incrementally**: Save and preview frequently to catch issues early
3. **Use Modern CSS**: Flexbox and Grid work great for layouts
4. **Handle Errors**: Add try-catch blocks in your JavaScript
5. **Responsive Design**: Use relative units (%, rem) for better scaling
