import React from 'react';
import { Weights } from '../types';

interface BayesianModelExplanationProps {
  weights: Weights;
}

const BayesianModelExplanation: React.FC<BayesianModelExplanationProps> = ({ weights }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Bayesian Model Explanation</h2>
      
      <p className="mb-4">
        Our model uses a simplified Bayesian approach to calculate the probability of a prospect becoming an All-Star.
        Think of it like a coach evaluating a player by watching different aspects of their game, but with each aspect
        weighted according to how important the coach thinks it is.
      </p>
      
      <h3 className="text-xl font-semibold mb-2">The Formula</h3>
      <div className="bg-gray-100 p-4 rounded-lg text-center overflow-x-auto mb-4">
        <p className="text-lg font-mono">
          P(A|S,D,H,T) = w<sub>s</sub> · P(S|A) + w<sub>d</sub> · P(D|A) + w<sub>h</sub> · P(H|A) + w<sub>t</sub> · P(T|A)
        </p>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Plain English Explanation</h3>
      <p className="mb-2">
        We're calculating how likely it is that a player will become an All-Star based on their attributes. Here's how it works:
      </p>
      <ol className="list-decimal pl-6 mb-4 space-y-2">
        <li>
          For each attribute (Shooting, Defense, Hustle, Team Fit), we compare the prospect's score to what typical All-Stars score.
        </li>
        <li>
          We use a statistical model (a Gaussian function) to determine how "All-Star-like" each attribute is.
        </li>
        <li>
          We multiply each attribute's "All-Star-likeness" by its importance weight.
        </li>
        <li>
          We add all these weighted scores together to get a final probability.
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-2">NBA Basketball Analogy</h3>
      <p className="mb-4">
        This is similar to how an NBA scout might evaluate a prospect. They watch the player's shooting, defense, 
        hustle plays, and team chemistry. Different teams value different skills (weights) - a team with strong 
        defenders might value shooting more, while a team with great shooters might prioritize defense.
      </p>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Variables Explained</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>P(A|S,D,H,T)</strong>: The probability of becoming an All-Star given the player's Shooting, Defense, Hustle, and Team Fit.</li>
          <li><strong>w<sub>s</sub>, w<sub>d</sub>, w<sub>h</sub>, w<sub>t</sub></strong>: The weights (importance) assigned to each attribute.</li>
          <li><strong>P(S|A), P(D|A), P(H|A), P(T|A)</strong>: The likelihood of seeing these attribute values in an All-Star player.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Current Weights</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Shooting: {Math.round(weights.shooting * 100)}%</li>
          <li>Defense: {Math.round(weights.defense * 100)}%</li>
          <li>Hustle: {Math.round(weights.hustle * 100)}%</li>
          <li>Team Fit: {Math.round(weights.teamFit * 100)}%</li>
        </ul>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">The Math Behind the Likelihood</h3>
        <p className="mb-2">
          For the mathematically inclined, each likelihood P(X|A) is calculated using the following formula:
        </p>
        <div className="bg-white p-3 rounded overflow-x-auto">
          <p className="text-md font-mono">
            P(X|A) = exp(-(X - μ)² / (2σ²))
          </p>
        </div>
        <p className="mt-2">
          Where:
        </p>
        <ul className="list-disc pl-6 mt-1">
          <li><strong>X</strong> is the prospect's attribute value</li>
          <li><strong>μ</strong> (mu) is the average value for All-Stars</li>
          <li><strong>σ</strong> (sigma) is the standard deviation (set to 15)</li>
          <li><strong>exp</strong> is the exponential function</li>
        </ul>
      </div>
    </div>
  );
};

export default BayesianModelExplanation;