# Setting Up the Project in Visual Studio

This guide provides step-by-step instructions for setting up and running the NBA Prospect Evaluation Dashboard in Visual Studio.

## Prerequisites

1. **Visual Studio 2022** with the following workloads installed:
   - ASP.NET and web development
   - Node.js development

2. **Node.js** (LTS version recommended)
   - Download and install from [https://nodejs.org/](https://nodejs.org/)

## Opening the Project

1. Launch Visual Studio 2022
2. Select "Open a project or solution"
3. Navigate to the project directory and select the `nba-prospect-evaluation.sln` file
4. Click "Open"

## Restoring Dependencies

### Backend Dependencies

1. Right-click on the solution in Solution Explorer
2. Select "Restore NuGet Packages"

### Frontend Dependencies

1. Open the Terminal in Visual Studio (View > Terminal)
2. Navigate to the project root directory (if not already there)
3. Run the following command:
   ```
   npm install
   ```

## Building the Project

1. Select "Build" > "Build Solution" from the menu
2. Wait for the build process to complete

## Running the Project

### Method 1: Using Visual Studio's Run Button

1. Make sure "nba-prospect-evaluation" is set as the startup project
   - Right-click on the project in Solution Explorer and select "Set as Startup Project"
2. Press F5 or click the "Start" button in the toolbar

### Method 2: Using npm scripts

1. Open the Terminal in Visual Studio
2. Run the following command:
   ```
   npm start
   ```

## Troubleshooting

### Issue: "Node.js is required to build and run this project"

1. Make sure Node.js is installed and added to your PATH
2. Restart Visual Studio

### Issue: Build errors related to TypeScript

1. Open the Terminal in Visual Studio
2. Run the following commands:
   ```
   npm install -g typescript
   npm install
   ```

### Issue: Unable to start development server

1. Check if port 3000 is already in use
2. You can modify the port in `package.json` by changing the start script to:
   ```
   "start": "set PORT=3001 && react-scripts start"
   ```

## Visual Studio Extensions That May Be Helpful

1. **TypeScript ESLint**: For TypeScript linting
2. **NPM Task Runner**: For running npm scripts from Visual Studio
3. **Web Essentials**: Additional web development tools

## Next Steps

Once the application is running, try:

1. Adjusting the prospect attributes using the sliders
2. Modifying the weights to see how the All-Star probability changes
3. Examining the comparison charts
4. Reading the Bayesian model explanation
