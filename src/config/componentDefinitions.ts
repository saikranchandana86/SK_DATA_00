import { ComponentDefinition } from '../types';

export const componentDefinitions: ComponentDefinition[] = [
  {
    type: 'table',
    name: 'Table',
    icon: 'Table',
    category: 'suggested',
    defaultProps: {
      tableData: [],
      columns: [],
      defaultSearchText: '',
      defaultPageSize: 10,
      showPagination: true,
      enableClientSideSearch: true,
      multiRowSelection: false,
      visible: true,
      animateLoading: false,
      variant: 'DEFAULT'
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 8
    },
    defaultSize: { width: 500, height: 400 },
    propertySchema: [
      { key: 'tableData', label: 'Table Data', type: 'code', section: 'Data', isJS: true },
      { key: 'defaultSearchText', label: 'Default Search Text', type: 'text', section: 'Basic' },
      { key: 'defaultPageSize', label: 'Default Page Size', type: 'number', section: 'Basic', defaultValue: 10 },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'showPagination', label: 'Show Pagination', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'enableClientSideSearch', label: 'Enable Client Side Search', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'multiRowSelection', label: 'Multi Row Selection', type: 'boolean', section: 'General', defaultValue: false }
    ]
  },
  {
    type: 'input',
    name: 'Input',
    icon: 'Square',
    category: 'suggested',
    defaultProps: {
      label: 'Input Label',
      placeholder: 'Enter text',
      defaultText: '',
      inputType: 'TEXT',
      visible: true,
      disabled: false,
      required: false
    },
    defaultStyle: {
      borderColor: '#d1d5db',
      borderWidth: 1,
      borderRadius: 6
    },
    defaultSize: { width: 280, height: 80 },
    propertySchema: [
      { key: 'label', label: 'Label', type: 'text', section: 'Basic' },
      { key: 'placeholder', label: 'Placeholder', type: 'text', section: 'Basic' },
      { key: 'defaultText', label: 'Default Text', type: 'text', section: 'Basic', isJS: true },
      { key: 'inputType', label: 'Input Type', type: 'select', section: 'Basic', options: ['TEXT', 'NUMBER', 'PASSWORD', 'EMAIL', 'SEARCH', 'PHONE', 'CURRENCY'] },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'disabled', label: 'Disabled', type: 'boolean', section: 'General', defaultValue: false },
      { key: 'required', label: 'Required', type: 'boolean', section: 'Validation', defaultValue: false },
      { key: 'maxChars', label: 'Max Characters', type: 'number', section: 'Validation' },
      { key: 'regex', label: 'Regex', type: 'regex', section: 'Validation' },
      { key: 'errorMessage', label: 'Error Message', type: 'text', section: 'Validation' }
    ]
  },
  {
    type: 'button',
    name: 'Button',
    icon: 'MousePointer',
    category: 'buttons',
    defaultProps: {
      label: 'Button',
      variant: 'PRIMARY',
      size: 'MEDIUM',
      visible: true,
      disabled: false,
      loading: false
    },
    defaultStyle: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      borderRadius: 6
    },
    defaultSize: { width: 120, height: 40 },
    propertySchema: [
      { key: 'label', label: 'Label', type: 'text', section: 'Basic' },
      { key: 'variant', label: 'Variant', type: 'select', section: 'Style', options: ['PRIMARY', 'SECONDARY', 'TERTIARY'] },
      { key: 'size', label: 'Size', type: 'select', section: 'Style', options: ['SMALL', 'MEDIUM', 'LARGE'] },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'disabled', label: 'Disabled', type: 'boolean', section: 'General', defaultValue: false }
    ]
  },
  {
    type: 'text',
    name: 'Text',
    icon: 'Type',
    category: 'display',
    defaultProps: {
      text: 'Sample Text',
      textStyle: 'BODY1',
      textAlign: 'LEFT',
      visible: true
    },
    defaultStyle: {
      color: '#374151',
      fontSize: 14
    },
    defaultSize: { width: 200, height: 40 },
    propertySchema: [
      { key: 'text', label: 'Text', type: 'textarea', section: 'Basic', isJS: true },
      { key: 'textStyle', label: 'Text Style', type: 'select', section: 'Style', options: ['HEADING1', 'HEADING2', 'HEADING3', 'BODY1', 'BODY2', 'CAPTION'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', section: 'Style', options: ['LEFT', 'CENTER', 'RIGHT', 'JUSTIFY'] },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true }
    ]
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'Image',
    category: 'display',
    defaultProps: {
      image: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=400',
      imageShape: 'RECTANGLE',
      visible: true,
      enableDownload: false,
      enableRotation: false,
      maxZoomLevel: 1
    },
    defaultStyle: {
      borderRadius: 8
    },
    defaultSize: { width: 200, height: 150 },
    propertySchema: [
      { key: 'image', label: 'Image URL', type: 'url', section: 'Basic', isJS: true },
      { key: 'imageShape', label: 'Image Shape', type: 'select', section: 'Style', options: ['RECTANGLE', 'CIRCLE', 'ROUNDED'] },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'enableDownload', label: 'Enable Download', type: 'boolean', section: 'General', defaultValue: false }
    ]
  },
  {
    type: 'select',
    name: 'Select',
    icon: 'ChevronDown',
    category: 'inputs',
    defaultProps: {
      label: 'Select Label',
      placeholder: 'Choose an option',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ],
      visible: true,
      disabled: false,
      isMultiSelect: false
    },
    defaultStyle: {
      borderColor: '#d1d5db',
      borderWidth: 1,
      borderRadius: 6
    },
    defaultSize: { width: 280, height: 80 },
    propertySchema: [
      { key: 'label', label: 'Label', type: 'text', section: 'Basic' },
      { key: 'placeholder', label: 'Placeholder', type: 'text', section: 'Basic' },
      { key: 'options', label: 'Options', type: 'code', section: 'Data', isJS: true },
      { key: 'defaultOptionValue', label: 'Default Selected Value', type: 'code', section: 'Data', isJS: true, tooltip: 'Default value to be selected' },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'disabled', label: 'Disabled', type: 'boolean', section: 'General', defaultValue: false },
      { key: 'isMultiSelect', label: 'Multi Select', type: 'boolean', section: 'General', defaultValue: false },
      { key: 'isFilterable', label: 'Enable Search', type: 'boolean', section: 'General', defaultValue: false },
      { key: 'onOptionChange', label: 'On Option Change', type: 'code', section: 'Events', isJS: true, tooltip: 'JavaScript to execute when selection changes. Available: selectedOption, selectedOptions, selectedOptionLabel' }
    ]
  },
  {
    type: 'checkbox',
    name: 'Checkbox',
    icon: 'CheckSquare',
    category: 'inputs',
    defaultProps: {
      label: 'Checkbox Label',
      defaultCheckedState: false,
      visible: true,
      disabled: false,
      required: false
    },
    defaultStyle: {
      accentColor: '#3b82f6'
    },
    defaultSize: { width: 200, height: 40 },
    propertySchema: [
      { key: 'label', label: 'Label', type: 'text', section: 'Basic' },
      { key: 'defaultCheckedState', label: 'Default Checked', type: 'boolean', section: 'Basic', defaultValue: false },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'disabled', label: 'Disabled', type: 'boolean', section: 'General', defaultValue: false },
      { key: 'required', label: 'Required', type: 'boolean', section: 'Validation', defaultValue: false }
    ]
  },
  {
    type: 'filepicker',
    name: 'FilePicker',
    icon: 'Upload',
    category: 'inputs',
    defaultProps: {
      label: 'Upload File',
      placeholder: 'Choose file',
      maxFileSize: 10,
      allowedFileTypes: ['image/*'],
      visible: true,
      disabled: false,
      multiple: false
    },
    defaultStyle: {
      borderColor: '#d1d5db',
      borderRadius: 6
    },
    defaultSize: { width: 280, height: 100 },
    propertySchema: [
      { key: 'label', label: 'Label', type: 'text', section: 'Basic' },
      { key: 'placeholder', label: 'Placeholder', type: 'text', section: 'Basic' },
      { key: 'multiple', label: 'Allow Multiple', type: 'boolean', section: 'General', defaultValue: false },
      { key: 'maxFileSize', label: 'Max File Size (MB)', type: 'number', section: 'Validation', defaultValue: 10 },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'disabled', label: 'Disabled', type: 'boolean', section: 'General', defaultValue: false }
    ]
  },
  {
    type: 'customfunction',
    name: 'Custom Function',
    icon: 'Code',
    category: 'display',
    defaultProps: {
      html: '<div class="custom-widget">\n  <div class="header">\n    <h2 class="title">Advanced Custom Widget</h2>\n    <span class="badge">v2.0</span>\n  </div>\n  <p class="description">Full access to components, APIs, queries, and state!</p>\n  \n  <div class="info-grid">\n    <div class="info-card">\n      <span class="label">Components:</span>\n      <span id="comp-count" class="value">-</span>\n    </div>\n    <div class="info-card">\n      <span class="label">APIs:</span>\n      <span id="api-count" class="value">-</span>\n    </div>\n    <div class="info-card">\n      <span class="label">Queries:</span>\n      <span id="query-count" class="value">-</span>\n    </div>\n  </div>\n  \n  <button class="action-btn" onclick="handleDemo()">Run Demo</button>\n  <button class="action-btn secondary" onclick="showContext()">Show Context</button>\n  <div id="output"></div>\n</div>',
      css: '.custom-widget {\n  padding: 24px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 12px;\n  color: white;\n  font-family: system-ui, -apple-system, sans-serif;\n  box-shadow: 0 10px 40px rgba(0,0,0,0.2);\n}\n\n.header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n.title {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n}\n\n.badge {\n  padding: 4px 12px;\n  background: rgba(255,255,255,0.2);\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n}\n\n.description {\n  margin: 0 0 20px 0;\n  opacity: 0.9;\n  font-size: 14px;\n}\n\n.info-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.info-card {\n  background: rgba(255,255,255,0.15);\n  padding: 12px;\n  border-radius: 8px;\n  text-align: center;\n}\n\n.label {\n  display: block;\n  font-size: 11px;\n  opacity: 0.8;\n  margin-bottom: 4px;\n}\n\n.value {\n  display: block;\n  font-size: 24px;\n  font-weight: 700;\n}\n\n.action-btn {\n  padding: 10px 20px;\n  background: white;\n  color: #667eea;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-right: 8px;\n  margin-bottom: 8px;\n}\n\n.action-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.2);\n}\n\n.action-btn.secondary {\n  background: rgba(255,255,255,0.2);\n  color: white;\n}\n\n#output {\n  margin-top: 16px;\n  padding: 12px;\n  background: rgba(0,0,0,0.2);\n  border-radius: 8px;\n  min-height: 40px;\n  font-size: 13px;\n  font-family: monospace;\n  max-height: 200px;\n  overflow-y: auto;\n}',
      javascript: '// Advanced Custom Function with Full Context Access\n// You have access to: components, apis, queries, state, appsmith, utils, props\n\n// Initialize - show context info\nfunction init() {\n  // Display counts\n  document.getElementById("comp-count").textContent = Object.keys(components).length;\n  document.getElementById("api-count").textContent = Object.keys(apis).length;\n  document.getElementById("query-count").textContent = Object.keys(queries).length;\n  \n  console.log("✅ Custom widget initialized!");\n  console.log("Available context:", { components, apis, queries, state, appsmith });\n}\n\n// Demo function\nfunction handleDemo() {\n  const output = document.getElementById("output");\n  const time = new Date().toLocaleTimeString();\n  \n  let html = `<div style="color: #a7f3d0;">\n    ⚡ Demo executed at ${time}<br><br>\n    📦 Local state: ${JSON.stringify(state)}<br>\n    🌍 Global state: ${JSON.stringify(appsmith.store)}<br>\n  </div>`;\n  \n  // Show API data if available\n  const apiKeys = Object.keys(apis);\n  if (apiKeys.length > 0) {\n    const firstApi = apis[apiKeys[0]];\n    html += `<br>🔌 API "${firstApi.name}": ${firstApi.isLoading ? "Loading..." : "Ready"}`;\n  }\n  \n  output.innerHTML = html;\n  \n  // Update local state\n  setState({ lastClick: time, clickCount: (state.clickCount || 0) + 1 });\n}\n\n// Show full context\nfunction showContext() {\n  const output = document.getElementById("output");\n  output.innerHTML = `<div style="color: #fde68a; font-size: 11px;">\n    <strong>📋 Available Context:</strong><br>\n    • components: ${Object.keys(components).join(", ") || "none"}<br>\n    • apis: ${Object.keys(apis).join(", ") || "none"}<br>\n    • queries: ${Object.keys(queries).join(", ") || "none"}<br>\n    • state: ${JSON.stringify(state)}<br>\n    • appsmith.store: ${JSON.stringify(appsmith.store)}<br><br>\n    <strong>🛠 Utils available:</strong> showAlert, navigateTo, copyToClipboard, downloadData\n  </div>`;\n}\n\n// Run initialization\ninit();',
      visible: true,
      animateLoading: false,
      height: 200
    },
    defaultStyle: {
      borderColor: '#d1d5db',
      borderWidth: 1,
      borderRadius: 8
    },
    defaultSize: { width: 300, height: 200 },
    propertySchema: [
      { key: 'html', label: 'HTML', type: 'code', section: 'Code' },
      { key: 'css', label: 'CSS', type: 'code', section: 'Code' },
      { key: 'javascript', label: 'JavaScript', type: 'code', section: 'Code' },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'height', label: 'Height (px)', type: 'number', section: 'General', defaultValue: 200 }
    ]
  },
  {
    type: 'card',
    name: 'Card',
    icon: 'FileText',
    category: 'display',
    defaultProps: {
      header: 'Card Header',
      text: 'Card content goes here',
      textColor: '#111827',
      backgroundColor: '#ffffff',
      queryId: '',
      autoRefresh: false,
      visible: true
    },
    defaultStyle: {
      borderRadius: 8,
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
    },
    defaultSize: { width: 300, height: 200 },
    propertySchema: [
      { key: 'header', label: 'Header', type: 'text', section: 'Content', isJS: true },
      { key: 'text', label: 'Text', type: 'textarea', section: 'Content', isJS: true },
      { key: 'textColor', label: 'Text Color', type: 'color', section: 'Style' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color', section: 'Style' },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true }
    ]
  },
  {
    type: 'chart',
    name: 'Chart',
    icon: 'BarChart3',
    category: 'display',
    defaultProps: {
      title: 'Sales Report',
      chartType: 'column',
      series: [
        {
          title: '2023',
          color: '#3b82f6',
          data: '[{"x":"Product1","y":20000},{"x":"Product2","y":15000},{"x":"Product3","y":30000}]'
        }
      ],
      xAxisName: 'Products',
      yAxisName: 'Sales',
      visible: true,
      animateLoading: false,
      allowScroll: false,
      showDataLabels: true,
      showLegend: true,
      legendPosition: 'bottom',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 8,
      labelOrientation: 'auto',
      labelTextSize: 12,
      gridLineColor: '#e5e7eb',
      enableTooltip: true
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 8
    },
    defaultSize: { width: 600, height: 400 },
    propertySchema: [
      { key: 'title', label: 'Title', type: 'text', section: 'General' },
      { key: 'chartType', label: 'Chart Type', type: 'select', section: 'General', options: ['column', 'bar', 'line', 'area', 'pie', 'custom'] },
      { key: 'visible', label: 'Visible', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'xAxisName', label: 'X-Axis Name', type: 'text', section: 'General' },
      { key: 'yAxisName', label: 'Y-Axis Name', type: 'text', section: 'General' },
      { key: 'showDataLabels', label: 'Show Data Labels', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'showLegend', label: 'Show Legend', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'legendPosition', label: 'Legend Position', type: 'select', section: 'General', options: ['top', 'bottom', 'left', 'right'] },
      { key: 'enableTooltip', label: 'Enable Tooltip', type: 'boolean', section: 'General', defaultValue: true },
      { key: 'onDataPointClick', label: 'On Data Point Click', type: 'code', section: 'Events', isJS: true, tooltip: 'JavaScript to execute when a data point is clicked. Available variables: x, y, seriesTitle, rawData' },
      { key: 'customEChartsConfig', label: 'Custom ECharts Config', type: 'code', section: 'Advanced', isJS: true, tooltip: 'Custom ECharts configuration (JSON)' },
      { key: 'labelOrientation', label: 'Label Orientation', type: 'select', section: 'Style', options: ['auto', 'horizontal', 'vertical', 'slant'] },
      { key: 'labelTextSize', label: 'Label Text Size', type: 'number', section: 'Style', defaultValue: 12 },
      { key: 'gridLineColor', label: 'Grid Line Color', type: 'color', section: 'Style' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color', section: 'Style' },
      { key: 'borderColor', label: 'Border Color', type: 'color', section: 'Style' },
      { key: 'borderWidth', label: 'Border Width', type: 'number', section: 'Style', defaultValue: 1 },
      { key: 'borderRadius', label: 'Border Radius', type: 'number', section: 'Style', defaultValue: 8 }
    ]
  }
];
