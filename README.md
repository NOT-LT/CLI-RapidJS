# create-rapidjs-app

A lightweight command-line tool to create RapidJS applications with minimal setup.

## Usage

Create a new RapidJS app in one command:

```bash
npx create-rapidjs-app my-app
```

Or specify a different directory name:

```bash
npx create-rapidjs-app my-awesome-app
```

If no directory name is provided, you will be prompted to enter a folder name. The default name is  `rapidjs-app`:

```bash
npx create-rapidjs-app
```

## What's Included

This tool creates a complete RapidJS project structure with:

### Core Framework Files
- **src/framework.js** - The main RapidJS framework with component system, routing, and event handling
- **src/variable.js** - Reactive state management with `useState` and `useRef` hooks
- **src/utils.js** - Utility functions for component management
- **src/server.js** - Development server with Express.js

### Application Structure
- **app/Pages/HomePage/Home.js** - Sample home page component
- **app/Components/Counter.js** - Interactive counter component demonstrating state management

### Frontend Assets
- **index.html** - Main HTML template
- **index.js** - Application entry point with routing setup
- **style.css** - Complete CSS styling with dark theme and responsive design

### Configuration
- **package.json** - Project configuration with necessary dependencies

## Getting Started

After creating your app:

1. Navigate to your project directory:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Features Included

- ✅ **Component System** - ES6 class-based components with automatic ID management
- ✅ **Reactive State** - `useState` and `useRef` hooks for state management
- ✅ **Event Handling** - Simple `@click`, `@input` event attributes
- ✅ **Client-side Routing** - SPA routing with `navigateTo` and route definitions
- ✅ **CSS Scoping** - Component-scoped CSS loading
- ✅ **Development Server** - Express.js server with live reloading support
- ✅ **Responsive Design** - Mobile-first CSS with dark theme



## Framework Overview

RapidJS is a lightweight frontend framework that provides:

- **Simple Component Structure**: Each component extends the `Component` class and implements a `render()` method
- **Reactive Updates**: Use `useState(initialValue)` to create reactive state that automatically updates the UI
- **Event Handling**: Add `@eventname="methodName"` attributes to elements for event handling
- **Routing**: Define routes with `app.route(path, ComponentClass)` for single-page applications
- **CSS Integration**: Load and scope CSS files with `loadStyle(path)`

## Example Component

```javascript
import { Component } from "../../src/framework.js";
import { useState } from "../../src/variable.js";

export class MyComponent extends Component {
  constructor() {
    super();
    useState({count: 0});
  }

  increment() {
    this.setCount(this.count + 1); // The setCount is created automatically by the framework
  }

  render() {
    return `
      <div>
        <button @click="increment">Click me!</button>
        <p>Count: ${this.count()}</p>
      </div>
    `;
  }
}
```

## Requirements

- Node.js 14.0.0 or higher
- npm or yarn package manager

## License

MIT License

## Author

Taha Aljamri
