# NBA Prospect Evaluation Dashboard

This is a TypeScript React application for evaluating NBA prospects using a Bayesian model approach. The application provides visual analytics and customizable parameters to assess a player's potential to become an NBA All-Star.

## Features

- Interactive player attribute sliders
- Customizable weights for different evaluation criteria
- Radar chart comparing prospect to average All-Star
- Bar chart comparison for individual attributes
- Probability calculation using a simplified Bayesian model
- Fully responsive design using Tailwind CSS

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Visual Studio integration

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Visual Studio 2022 (with Web Development workload installed)

### Installation

1. Clone this repository
2. Open the solution file `nba-prospect-evaluation.sln` in Visual Studio
3. Right-click on the project in Solution Explorer and select "Set as Startup Project"
4. Press F5 to run the application

Alternatively, you can run the application without Visual Studio:

```bash
cd nba-prospect-evaluation
npm install
npm start
```

## Project Structure

- `/src/components` - React components
- `/src/types` - TypeScript type definitions
- `/src` - Main source code

## How It Works

The application uses a simplified Bayesian model to calculate a prospect's probability of becoming an All-Star:

P(A|S,D,H,T) = wₛ · P(S|A) + wₐ · P(D|A) + wₕ · P(H|A) + wₜ · P(T|A)

Where:
- P(A|S,D,H,T) is the probability of becoming an All-Star given the player's attributes
- wₛ, wₐ, wₕ, wₜ are the weights for each attribute
- P(S|A), P(D|A), P(H|A), P(T|A) are the likelihoods of each attribute if the player is an All-Star

The likelihoods are calculated using a Gaussian-inspired function where:
- The mean is the average value for All-Stars
- The standard deviation is set to 15 (configurable)

## Customization

You can customize the dashboard by:
1. Adjusting player attributes using sliders
2. Modifying the weights of each evaluation criterion
3. Updating the default values in the code

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NBA statistical data sources (requires attribution when using real data)
- React and TypeScript communities
- Recharts library for the visualization components
