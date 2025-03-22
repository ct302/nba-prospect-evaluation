import React, { useState } from 'react';
import BayesianModelExplanation from './BayesianModelExplanation';
import { 
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Pie, PieChart, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import {
  Prospect,
  Weights,
  RadarDataPoint,
  WeightDataPoint,
  ComparisonDataPoint,
  AllStarAverages
} from '../types';

const ProspectEvaluationDashboard: React.FC = () => {
  // State for all our inputs and calculations
  const [prospect, setProspect] = useState<Prospect>({
    name: "Rookie Rocket",
    shooting: 85,      // Out of 100
    defense: 70,       // Out of 100
    hustle: 90,        // Out of 100
    teamFit: 75,       // Out of 100
  });
  
  const [weights, setWeights] = useState<Weights>({
    shooting: 0.4,
    defense: 0.2,
    hustle: 0.25,
    teamFit: 0.15,
  });
  
  // Historical data of All-Stars average scores
  const allStarAverages: AllStarAverages = {
    shooting: 85,
    defense: 80,
    hustle: 85,
    teamFit: 75,
  };
  
  // Calculate likelihood P(X|A) - how likely is this stat for an All-Star
  const calculateLikelihood = (value: number, category: keyof AllStarAverages): number => {
    // Simple Gaussian-inspired function
    const mean = allStarAverages[category];
    const sigma = 15; // Standard deviation
    return Math.exp(-Math.pow(value - mean, 2) / (2 * Math.pow(sigma, 2)));
  };
  
  // Calculate final probability
  const calculateProbability = (): number => {
    const shootingLikelihood = calculateLikelihood(prospect.shooting, 'shooting');
    const defenseLikelihood = calculateLikelihood(prospect.defense, 'defense');
    const hustleLikelihood = calculateLikelihood(prospect.hustle, 'hustle');
    const teamFitLikelihood = calculateLikelihood(prospect.teamFit, 'teamFit');
    
    return (
      weights.shooting * shootingLikelihood +
      weights.defense * defenseLikelihood +
      weights.hustle * hustleLikelihood +
      weights.teamFit * teamFitLikelihood
    );
  };
  
  // Normalized to percentage
  const allStarProbability = Math.min(100, Math.round(calculateProbability() * 100));
  
  // Data for radar chart
  const radarData: RadarDataPoint[] = [
    {
      subject: 'Shooting',
      prospect: prospect.shooting,
      allStar: allStarAverages.shooting,
      fullMark: 100,
    },
    {
      subject: 'Defense',
      prospect: prospect.defense,
      allStar: allStarAverages.defense,
      fullMark: 100,
    },
    {
      subject: 'Hustle',
      prospect: prospect.hustle,
      allStar: allStarAverages.hustle,
      fullMark: 100,
    },
    {
      subject: 'Team Fit',
      prospect: prospect.teamFit,
      allStar: allStarAverages.teamFit,
      fullMark: 100,
    },
  ];
  
  // Data for weights pie chart
  const weightData: WeightDataPoint[] = [
    { name: 'Shooting', value: weights.shooting },
    { name: 'Defense', value: weights.defense },
    { name: 'Hustle', value: weights.hustle },
    { name: 'Team Fit', value: weights.teamFit },
  ];
  
  const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];
  
  // Handler for updating prospect values
  const handleProspectChange = (category: keyof Omit<Prospect, 'name'>, value: string): void => {
    setProspect({
      ...prospect,
      [category]: parseInt(value, 10)
    });
  };
  
  // Handler for updating weights
  const handleWeightChange = (category: keyof Weights, value: string): void => {
    const newValue = parseFloat(value);
    // Update the weight for this category
    setWeights(prevWeights => {
      const updatedWeights = {
        ...prevWeights,
        [category]: newValue
      };
      
      // Normalize weights to sum to 1
      const sum = Object.values(updatedWeights).reduce((a, b) => a + b, 0);
      if (sum > 0) {
        const normalizedWeights = { ...updatedWeights };
        (Object.keys(normalizedWeights) as Array<keyof Weights>).forEach(key => {
          normalizedWeights[key] = normalizedWeights[key] / sum;
        });
        return normalizedWeights;
      }
      
      return updatedWeights;
    });
  };

  // Player comparison data
  const comparisonData: ComparisonDataPoint[] = [
    {
      name: 'Shooting',
      prospect: prospect.shooting,
      allStar: allStarAverages.shooting,
    },
    {
      name: 'Defense',
      prospect: prospect.defense,
      allStar: allStarAverages.defense,
    },
    {
      name: 'Hustle',
      prospect: prospect.hustle,
      allStar: allStarAverages.hustle,
    },
    {
      name: 'Team Fit',
      prospect: prospect.teamFit,
      allStar: allStarAverages.teamFit,
    },
  ];
  
  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">NBA Prospect Evaluation Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prospect Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Prospect Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Prospect Name</label>
            <input
              type="text"
              value={prospect.name}
              onChange={(e) => setProspect({...prospect, name: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Sliders for prospect attributes */}
          {(Object.entries(prospect).filter(([key]) => key !== 'name') as [keyof Omit<Prospect, 'name'>, number][]).map(([key, value]) => (
            <div key={key} className="mb-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 capitalize">{key}</label>
                <span>{value}/100</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => handleProspectChange(key, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        
        {/* Weights Adjustment */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Scouting Weights</h2>
          <p className="mb-4 text-gray-600">Adjust how important each factor is in evaluating All-Star potential</p>
          
          {/* Sliders for weights */}
          {(Object.entries(weights) as [keyof Weights, number][]).map(([key, value]) => (
            <div key={key} className="mb-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 capitalize">{key}</label>
                <span>{Math.round(value * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={(e) => handleWeightChange(key, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
          
          {/* Weights distribution chart */}
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={weightData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({name, percent}: {name: string, percent: number}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {weightData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* All-Star Probability */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">All-Star Probability</h2>
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold">{allStarProbability}%</div>
                <div className="text-lg text-gray-600">Likelihood</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Probability', value: allStarProbability },
                    { name: 'Remaining', value: 100 - allStarProbability }
                  ]}
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#4CAF50" />
                  <Cell fill="#ECEFF1" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-lg">
              {allStarProbability >= 80 ? 'Elite Prospect' : 
               allStarProbability >= 60 ? 'Strong All-Star Potential' :
               allStarProbability >= 40 ? 'Solid Prospect' :
               'Development Project'}
            </p>
          </div>
        </div>
        
        {/* Radar Chart Comparison */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Prospect vs Average All-Star</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name={prospect.name} dataKey="prospect" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} />
                <Radar name="Avg All-Star" dataKey="allStar" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Bar Chart Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Attribute Comparison</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="prospect" name={prospect.name} fill="#FF8042" />
              <Bar dataKey="allStar" name="Avg All-Star" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bayesian Model Explanation Component */}
      <BayesianModelExplanation weights={weights} />
    </div>
  );
};

export default ProspectEvaluationDashboard;