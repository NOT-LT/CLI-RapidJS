#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const ora = require("ora");
const inquirer = require("inquirer");
const { execSync } = require("child_process");


// Folder structure - excluding unnecessary components and CounterPage
const folders = [
    "app",
    "app/Components",
    "app/Pages",
    "app/Pages/HomePage",
    "src"
];

// Files to create
const files = {
    "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RapidJS App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="index.js"></script>
</body>
</html>`,

    "index.js": `import { rapid } from "./src/framework.js";
import { Home } from "./app/Pages/HomePage/Home.js";

const app = rapid();
app.route('/', Home);

app.start();

export default app;`,

    "package.json": `{
  "name": "rapidjs",
  "version": "1.0.0",
  "description": "A lightweight front-end framework for Javascript.",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon ./src/server.js"
  },
  "keywords": [
    "framework",
    "javascript",
    "front-end",
    "lightweight",
    "frontend",
    "framework"
  ],
  "dependencies": {
    "express": "^4.21.2",
    "nodemon": "^2.0.22"
  }
}`,

    "style.css": `/* This file is a global css styles that can be used in any component without import/load */

/* Dark Theme Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    line-height: 1.6;
}

/* Home Component Styles */
.home-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.home-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
}

.framework-badge {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
}

.home-title {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
}

.home-description {
    font-size: 1.25rem;
    color: #a1a1aa;
    max-width: 600px;
    margin-bottom: 3rem;
    line-height: 1.6;
}

.showcase-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #f3f4f6;
}

/* Footer Styles */
.home-footer {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.footer-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #f3f4f6;
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.footer-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #e5e7eb;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.footer-link:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    transform: translateY(-2px);
    color: #ffffff;
}

/* Counter Component Styles */
.counter-container {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    min-width: 300px;
    width: 100%;
    max-width: 400px;
}

.counter-button {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
    margin-bottom: 1.5rem;
}

.counter-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
}

.counter-button:active {
    transform: translateY(0);
}

.counter-display {
    font-size: 2rem;
    font-weight: 700;
    color: #f3f4f6;
    margin: 0;
}

/* Todo List Component Styles */
.todo-container {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.todo-title {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.todo-input-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.todo-input {
    flex: 1;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
}

.todo-input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.todo-input::placeholder {
    color: #9ca3af;
}

.todo-add-button {
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
}

.todo-add-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
}

.todo-list {
    list-style: none;
    padding: 0;
}

.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    margin-bottom: 0.75rem;
    transition: all 0.3s ease;
}

.todo-item:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
}

.todo-text {
    color: #f3f4f6;
    font-size: 1rem;
    flex: 1;
}

.todo-remove-button {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
}

.todo-remove-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
    .home-main {
        padding: 2rem 1rem;
    }

    .counter-showcase {
        padding: 2rem;
        margin: 0 1rem 2rem;
    }

    .footer-links {
        flex-direction: column;
        align-items: center;
    }

    .todo-input-container {
        flex-direction: column;
        gap: 1rem;
    }

    .todo-container {
        margin: 1rem;
        padding: 1.5rem;
        max-width: calc(100% - 2rem);
    }

    .counter-container {
        margin: 1rem;
        padding: 1.5rem;
        min-width: auto;
        max-width: calc(100% - 2rem);
    }

    .counter-buttons {
        flex-direction: column;
        gap: 0.75rem;
    }

    .counter-button {
        padding: 0.875rem 1.5rem;
        font-size: 1rem;
    }

    .counter-display {
        font-size: 1.75rem;
    }

    .todo-title {
        font-size: 1.75rem;
    }
}

@media (max-width: 480px) {
    .todo-container {
        margin: 0.5rem;
        padding: 1.25rem;
    }

    .counter-container {
        margin: 0.5rem;
        padding: 1.25rem;
    }

    .counter-button {
        padding: 0.75rem 1.25rem;
        font-size: 0.95rem;
    }

    .counter-display {
        font-size: 1.5rem;
    }

    .todo-title {
        font-size: 1.5rem;
    }

    .todo-input,
    .todo-add-button {
        padding: 0.875rem;
        font-size: 0.95rem;
    }
}


.counter-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.counter-button-decrement {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
}

.counter-button-increment {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
}

.counter-button-reset {
    background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%) !important;
}`,

    "src/framework.js": `import { setCurrentComponent, clearCurrentComponent } from "./variable.js";
import { setComponentInRegistry, getComponentFromRegistry, setCurrentComponentContext, clearCurrentComponentContext, getCurrentComponentId as getComponentId } from "./utils.js";

// Base Component class that automatically handles ID assignment
export class Component {
  constructor() {
    try {
      this.id = registerComponent(this);
    } catch (error) {
      console.error('Error registering component:', error);
      throw error;
    }
  }

  // Helper method to safely render with automatic data-component-id injection
  safeRender() {
    try {
      let html = this.render();
      html = this.processNestedComponents(html);
      return this.injectComponentId(html);
    } catch (error) {
      console.error(\`Error rendering component \${this.id}: \`, error);
      return \`<div data-component-id="\${this.id}">Error rendering component</div>\`;
    }
  }

  // Process nested components to ensure they have data-component-id
  processNestedComponents(html) {
    if (!html || typeof html !== 'string') {
      return html;
    }

    // Pattern to match \${this.ComponentName.render()} calls
    const componentPattern = /\\\$\\{this\\.(\\w+)\\.render\\(\\)\\}/g;

    return html.replace(componentPattern, (match, componentPropertyName) => {
      try {
        const component = this[componentPropertyName];
        if (component && typeof component.render === 'function') {
          // If it's a Component instance, use safeRender
          if (component instanceof Component) {
            return component.safeRender();
          }
          // If it has an ID but isn't a Component instance, inject the ID manually
          else if (component.id) {
            let renderedHTML = component.render();
            return this.injectComponentIdToHTML(renderedHTML, component.id);
          }
          // Fallback to regular render
          else {
            return component.render();
          }
        }
        return match;
      } catch (error) {
        console.warn('Error processing nested component:', componentPropertyName, error);
        return match;
      }
    });
  }

  // Helper method to inject component ID into any HTML
  injectComponentIdToHTML(html, componentId) {
    if (!html || typeof html !== 'string') {
      return \`<div data-component-id="\${componentId}">Invalid render output</div>\`;
    }

    // Parse the HTML to find the first element
    const parser = new DOMParser();
    const doc = parser.parseFromString(\`<root>\${html}</root>\`, 'text/html');
    const rootElement = doc.querySelector('root');

    if (!rootElement || !rootElement.firstElementChild) {
      // If no valid element found, wrap in a div
      return \`<div data-component-id="\${componentId}">\${html}</div>\`;
    }

    const firstElement = rootElement.firstElementChild;

    // Check if data-component-id already exists
    if (!firstElement.hasAttribute('data-component-id')) {
      firstElement.setAttribute('data-component-id', componentId);
    }

    return firstElement.outerHTML;
  }

  // Automatically inject data-component-id into the root element
  injectComponentId(html) {
    return this.injectComponentIdToHTML(html, this.id);
  }

  // Default render method (should be overridden)
  render() {
    console.warn(\`Component \${this.constructor.name} should implement render() method\`);
    return \`<div>Component \${this.constructor.name}</div>\`;
  }
}

// Reactive system
let routes = [];
let currentComponent = null;
const loadedComponentStyles = new Set();
let componentId = 0;

window.addEventListener('popstate', navigateRoute);

// Helper functions for event parsing
function parseParameters(paramString) {
  if (!paramString) return [];

  const params = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let depth = 0;

  for (let i = 0; i < paramString.length; i++) {
    const char = paramString[i];

    if ((char === '"' || char === "'") && !inString) {
      inString = true;
      stringChar = char;
      current += char;
    } else if (char === stringChar && inString) {
      inString = false;
      stringChar = '';
      current += char;
    } else if (!inString && (char === '{' || char === '[')) {
      depth++;
      current += char;
    } else if (!inString && (char === '}' || char === ']')) {
      depth--;
      current += char;
    } else if (!inString && char === ',' && depth === 0) {
      params.push(parseValue(current.trim()));
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    params.push(parseValue(current.trim()));
  }

  return params;
}

function parseValue(value) {
  if (!value || !value.trim()) return value;

  value = value.trim();

  // Handle strings
  if ((value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  // Handle null/undefined
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;

  // Handle booleans
  if (value === 'true') return true;
  if (value === 'false') return false;

  // Handle numbers
  if (!isNaN(value) && !isNaN(parseFloat(value))) {
    return parseFloat(value);
  }

  // Handle objects and arrays
  if ((value.startsWith('{') && value.endsWith('}')) ||
    (value.startsWith('[') && value.endsWith(']'))) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  return value;
}

// Event handling
const events = [
  "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout",
  "keydown", "keyup", "input", "change", "submit", "focus", "blur",
  "contextmenu", "wheel", "drag", "drop", "touchstart", "touchmove", "touchend"
];

events.forEach((eventType) => {
  document.addEventListener(eventType, (event) => {
    const targetElement = event.target;
    let currentElement = targetElement;
    
    while (currentElement) {
      if (currentElement.attributes) {
        for (const attr of currentElement.attributes) {
          if (attr.name.startsWith("@")) {
            const attrEvent = attr.name.slice(1);
            if (attrEvent !== eventType) continue;

            const methodName = attr.value.trim().split('(')[0];
            const methodParams = attr.value.trim().split('(')[1]?.replace(')', '').trim();
            let parsedParams = [];

            if (methodParams) {
              parsedParams = parseParameters(methodParams);
            }

            const componentElement = currentElement.closest("[data-component-id]");
            if (!componentElement) continue;

            const componentId = componentElement.dataset.componentId;
            const component = getComponent(componentId);
            if (component && typeof component[methodName] === "function") {
              event.preventDefault();
              event.stopPropagation();

              try {
                if (parsedParams.length > 0) {
                  component[methodName]({ event, params: parsedParams });
                } else {
                  component[methodName]({ event });
                }
              } catch (error) {
                console.error(\`Error calling method \${methodName}: \`, error);
                component[methodName]({ event, params: parsedParams });
              }
              return;
            }
          }
        }
      }
      currentElement = currentElement.parentElement;
    }
  });
});

// Style loading
export async function loadStyle(path) {
  if (!path || typeof path !== 'string') {
    console.warn('Invalid CSS path provided to loadStyle');
    return;
  }

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(\`Failed to load CSS: \${response.status} \${response.statusText}\`);
    }

    let cssContent = await response.text();
    const componentId = getComponentId();
    const styleKey = componentId ? \`\${path}-\${componentId}\` : path;

    if (loadedComponentStyles.has(styleKey)) {
      return;
    }

    if (componentId) {
      cssContent = scopeCSS(cssContent, componentId);
    }

    const style = document.createElement('style');
    style.setAttribute('data-style-path', path);
    style.setAttribute('data-component-id', componentId || 'global');
    style.textContent = cssContent;
    document.head.appendChild(style);

    loadedComponentStyles.add(styleKey);
  } catch (error) {
    console.warn(\`Failed to load style: \${path}\`, error);
  }
}

function scopeCSS(cssContent, componentId) {
  return cssContent.replace(
    /([^{}]+)\\s*\\{/g,
    (match, selector) => {
      if (selector.trim().startsWith('@')) {
        return match;
      }

      if (selector.includes('[data-component-id=')) {
        return match;
      }

      const scopedSelector = selector
        .split(',')
        .map(s => \`[data-component-id="\${componentId}"] \${s.trim()}\`)
        .join(', ');

      return \`\${scopedSelector} {\`;
    }
  );
}

// Component management
export function registerComponent(instance) {
  const id = \`component-\${componentId++}\`;
  setCurrentComponent(instance);
  setComponentInRegistry(id, instance);
  return id;
}

export function navigateRoute() {
  try {
    const path = window.location.pathname;
    const route = routes.find((route) => route.path === path);
    const root = document.getElementById("root");
    
    if (!root) {
      console.error("Root element not found");
      return;
    }

    if (currentComponent) {
      root.innerHTML = "";
    }

    if (route) {
      try {
        currentComponent = new route.component();
        clearCurrentComponent();
        const renderedContent = currentComponent.safeRender();
        root.innerHTML = renderedContent;
      } catch (error) {
        console.error(\`Error creating component for route \${path}: \`, error);
        root.innerHTML = \`<div>Error loading page: \${error.message}</div>\`;
      }
    } else {
      root.innerHTML = \`
        <div style="text-align: center; padding: 2rem;">
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/" style="color: #3b82f6; text-decoration: none;">Go back home</a>
        </div>
      \`;
    }
  } catch (error) {
    console.error("Error in navigateRoute:", error);
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = \`<div>Navigation error: \${error.message}</div>\`;
    }
  }
}

export function updateDOM(component) {
  if (!component || !component.id) return;

  const element = document.querySelector(\`[data-component-id="\${component.id}"]\`);
  if (element) {
    const activeElement = document.activeElement;
    const isInputFocused = activeElement && activeElement.tagName === 'INPUT';
    const activeInputId = isInputFocused ? activeElement.id : null;
    const cursorPosition = isInputFocused ? activeElement.selectionStart : null;

    const newHTML = component.safeRender();
    const newElement = document.createRange().createContextualFragment(newHTML).firstElementChild;

    if (newElement) {
      element.parentNode.replaceChild(newElement, element);

      if (activeInputId) {
        const newInput = document.getElementById(activeInputId);
        if (newInput) {
          newInput.focus();
          if (cursorPosition !== null) {
            newInput.setSelectionRange(cursorPosition, cursorPosition);
          }
        }
      }
    }
  } else {
    if (currentComponent && currentComponent.id === component.id) {
      const root = document.getElementById("root");
      if (root) {
        root.innerHTML = currentComponent.safeRender();
      }
    }
  }
}

export function getComponent(id) {
  return getComponentFromRegistry(id);
}

export function createRoute(path, component) {
  routes.push({ path, component });
}

export function rapid() {
  return {
    route,
    navigateTo,
    start
  }
}

function route(path, component) {
  createRoute(path, component);
}

function navigateTo(path) {
  history.pushState(null, '', path);
  navigateRoute();
}

function start() {
  navigateRoute();
}

// Clean up hash if present
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}`,

    "src/variable.js": `import {
  getCurrentComponentContext,
  getComponentFromRegistry,
  updateComponentDOM,
  setCurrentComponentContext,
  clearCurrentComponentContext,
} from "./utils.js";

class Variable {
  constructor(value, shouldUpdateDOM = true) {
    this.value = value;
    this.subscribers = new Set();
    this.componentId = null;
    this.shouldUpdateDOM = shouldUpdateDOM;
  }

  get() {
    return this.value;
  }

  set(newValue) {
    if (this.value !== newValue) {
      this.value = newValue;
      this.subscribers.forEach((cb) => cb(this.value));

      if (this.shouldUpdateDOM && this.componentId) {
        const component = getComponentFromRegistry(this.componentId);
        if (component) {
          updateComponentDOM(component);
        }
      }
    }
  }

  setComponentId(componentId) {
    this.componentId = componentId;
  }
}

// Set current component context
export function setCurrentComponent(component) {
  setCurrentComponentContext(component);
}

// Clear current component context
export function clearCurrentComponent() {
  clearCurrentComponentContext();
}

// Method 1: useState - Reactive state
export function useState(initialState = {}) {
  const currentComponent = getCurrentComponentContext();
  if (!currentComponent) {
    console.warn("useState called outside of component constructor");
    return;
  }

  Object.entries(initialState).forEach(([key, initialValue]) => {
    const variable = new Variable(initialValue, true);
    variable.setComponentId(currentComponent.id);

    const getter = function (id) {
      if (id) {
        queueMicrotask(() => {
          const element = document.getElementById(id);
          if (element && !element.dataset.hasListener) {
            element.addEventListener("input", (e) =>
              variable.set(e.target.value)
            );
            element.dataset.hasListener = "true";
          }
        });
      }
      return variable.get();
    };

    const setter = function (newValue) {
      variable.set(newValue);
    };

    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    currentComponent[key] = getter;
    currentComponent[\`set\${capitalizedKey}\`] = setter;
  });
}

// Method 2: useRef - Non-reactive state
export function useRef(initialRefs = {}) {
  const currentComponent = getCurrentComponentContext();
  if (!currentComponent) {
    console.warn("useRef called outside of component constructor");
    return;
  }

  Object.entries(initialRefs).forEach(([key, initialValue]) => {
    const variable = new Variable(initialValue, false);
    variable.setComponentId(currentComponent.id);

    const getter = function (id) {
      if (id) {
        queueMicrotask(() => {
          const element = document.getElementById(id);
          if (element && !element.dataset.hasListener) {
            element.addEventListener("input", (e) =>
              variable.set(e.target.value)
            );
            element.dataset.hasListener = "true";
          }
        });
      }
      return variable.get();
    };

    const setter = function (newValue) {
      variable.set(newValue);
    };

    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    currentComponent[key] = getter;
    currentComponent[\`set\${capitalizedKey}\`] = setter;
  });
}

// Backward compatibility
export const createReactiveProps = useState;

// Backward compatible createVar
export const createVar = (initialValue) => {
  const variable = new Variable(initialValue, true);
  const currentComponent = getCurrentComponentContext();

  if (currentComponent) {
    variable.setComponentId(currentComponent.id);
  }

  function value(id) {
    if (id) {
      queueMicrotask(() => {
        const element = document.getElementById(id);
        if (element && !element.dataset.hasListener) {
          element.addEventListener("input", (e) =>
            variable.set(e.target.value)
          );
          element.dataset.hasListener = "true";
        }
      });
    }
    return variable.get();
  }

  function setValue(newValue) {
    variable.set(newValue);
  }

  return [value, setValue];
};

// Simple effect function
let effectCallback = null;

export const createEffect = (callback) => {
  effectCallback = callback;
  callback();
  effectCallback = null;
};`,

    "src/utils.js": `// Utility functions to break circular dependencies

let currentComponent = null;
const componentRegistry = new Map();

export function setCurrentComponentContext(component) {
    currentComponent = component;
}

export function getCurrentComponentContext() {
    return currentComponent;
}

export function clearCurrentComponentContext() {
    currentComponent = null;
}

export function getComponentFromRegistry(id) {
    return componentRegistry.get(id);
}

export function setComponentInRegistry(id, component) {
    componentRegistry.set(id, component);
}

export function getAllComponentsFromRegistry() {
    return componentRegistry;
}

export function getCurrentComponentId() {
    // Try to find the component that's currently being constructed
    const error = new Error();
    const stack = error.stack;

    // Look through the component registry to find which component is being initialized
    for (const [id, component] of componentRegistry.entries()) {
        if (component && component.constructor && stack.includes(component.constructor.name)) {
            return id;
        }
    }

    return null;
}

export function updateComponentDOM(component) {
    // This will be called from variable.js to update DOM
    // We'll import and call the updateDOM function dynamically to avoid circular dependency
    import("./framework.js").then(({ updateDOM }) => {
        updateDOM(component);
    });
}
`,

    "src/server.js": `const express = require('express');
    const path = require('path');
    
    const app = express();
    let PORT = process.env.PORT || 3000;
    
    // Serve static files from the current directory
    app.use(express.static(path.join(__dirname, '..')));
    
    // Handle client-side routing - serve index.html for all routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    });
    
    function startServer() {
        app.listen(PORT, () => {
            console.log(\`RapidJS development server running at http://localhost:\${PORT}\`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(\`Port \${PORT} is in use. Retrying on port \${++PORT}...\`);
                startServer();
            } else {
                console.error('Error starting server:', err);
            }
        });
    }
    
    startServer();`,

    "app/Pages/HomePage/Home.js": `import { Component } from "../../../src/framework.js";
import { Counter } from "../../Components/Counter.js";
import rapid from "../../../index.js";
export class Home extends Component {
  constructor() {
    super(); // This automatically assigns this.id
    this.Counter = new Counter();
  }

  navigateToTodo() {
    rapid.navigateTo('/todo');
  }

  navigateToCounter() {
    rapid.navigateTo('/counter');
  }

  navigateToWeather() {
    rapid.navigateTo('/weather');
  }

  render() {
    return \`<div>
        <div class="home-container">
            <main class="home-main">
                <div class="framework-badge">
                    🚀 RapidJS Framework
                </div>

                <h1 class="home-title">
                    Welcome to RapidJS
                </h1>

                <p class="home-description">
                    A lightweight, reactive front-end framework for JavaScript.<br />
                    Experience the power of reactive state management.
                </p>

                <h3 class="showcase-title">Interactive Counter Component</h3>
                \${this.Counter.safeRender()}
            </main>


        </div>
    </div > \`
    ;
  }
}
`,

    "app/Pages/HomePage/Home.js": `import { Component } from "../../../src/framework.js";
import { Counter } from "../../Components/Counter.js";
import rapid from "../../../index.js";
export class Home extends Component {
  constructor() {
    super(); // This automatically assigns this.id
    this.Counter = new Counter();
  }

  navigateToTodo() {
    rapid.navigateTo('/todo');
  }

  navigateToCounter() {
    rapid.navigateTo('/counter');
  }

  navigateToWeather() {
    rapid.navigateTo('/weather');
  }

  render() {
    return \`  <div>
      <div class="home-container">
        <main class="home-main">
          <div class="framework-badge">
            🚀 RapidJS Framework
          </div>

          <h1 class="home-title">
            Welcome to RapidJS
          </h1>

          <p class="home-description">
            A lightweight, reactive front-end framework for JavaScript.<br />
            Experience the power of reactive state management.
          </p>

            <h3 class="showcase-title">Interactive Counter Component</h3>
            \${this.Counter.safeRender()}
        </main>

        
      </div>
    </div> \`
    ;
  }
}
`,
    "app/Components/Counter.js": `import { useState } from "../../src/variable.js";
import { Component } from "../../src/framework.js";

export class Counter extends Component {
  constructor() {
    super(); // This automatically assigns this.id and sets up Component features
    useState({ count: 0 });
  }

  increment() {
    this.setCount(this.count() + 1);
  }

  decrement() {
    this.setCount(this.count() - 1);
  }

  reset() {
    this.setCount(0);
  }

  render() {
    return \`
        <div class="counter-container">
        <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem;">
          <button class="counter-button" @click="decrement" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">-</button>
          <button class="counter-button" @click="increment" > +</button >
    <button class="counter-button" @click="reset" style = "background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);" > Reset</button >
        </div>
    <p class="counter-display">Count: \${this.count()}</p>
      </div>
    \`;
  }
}`
};

// Function to create folders
// Helper functions
async function createFolders(basePath) {

    for (const folder of folders) {
        const folderPath = path.join(basePath, folder);
        if (!(await fs.promises.stat(folderPath).catch(() => false))) {
            await fs.promises.mkdir(folderPath, { recursive: true });
            console.log(`Created folder: ${folderPath}`);
        }
    }
}

// Function to create files
async function createFiles(basePath) {
    for (const [filePath, content] of Object.entries(files)) {
        const fullPath = path.join(basePath, filePath);
        if (!(await fs.promises.stat(fullPath).catch(() => false))) {
            await fs.promises.writeFile(fullPath, content);
            console.log(`Created file: ${fullPath}`);
        }
    }
}

// Main function

async function getTargetDir() {
    if (process.argv[2]) return process.argv[2];

    const { folderName } = await inquirer.prompt([
        {
            name: "folderName",
            message: "What would you like to name your app?",
            default: "rapidjs-app"
        }
    ]);

    return folderName;
}


async function main(tDir) {
    const targetDir = tDir;
    const basePath = path.resolve(process.cwd(), targetDir);

    try {
        if (!(await fs.promises.stat(basePath).catch(() => false))) {
            await fs.promises.mkdir(basePath, { recursive: true });
            console.log(`Created project folder: ${basePath}`);
        }

        await createFolders(basePath);
        await createFiles(basePath);

        console.log("");
        console.log("RapidJS project structure created successfully!");
        console.log("");

        const spinner = ora("Installing dependencies...").start();
        try {
            execSync("npm install", { cwd: basePath, stdio: "ignore" });
            spinner.succeed("Dependencies installed successfully!");
        } catch (error) {
            spinner.fail("Failed to install dependencies. Please run 'npm install' manually.");
        }

        console.log("");
    } catch (error) {
        console.error("Error during project setup:", error);
        process.exit(1);
    }
}

async function getTargetDir() {
    if (process.argv[2]) return process.argv[2];

    const inquirer = await import("inquirer");
    const { folderName } = await inquirer.default.prompt([
        {
            name: "folderName",
            message: "What would you like to name your app?",
            default: "rapidjs-app",
        },
    ]);

    return folderName;
}

getTargetDir()
    .then((targetDir) => {
        main(targetDir).then(() => {
            console.log("[!] RapidJS project structure created successfully!");
            console.log("");
            console.log("To get started:");
            console.log(`1.  cd ${targetDir}`);
            console.log("2.  npm run dev");
            console.log("");
        });
    })
    .catch((error) => {
        console.error("Error creating RapidJS project:", error);
        process.exit(1);
    });