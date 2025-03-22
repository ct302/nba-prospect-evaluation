import React from 'react';

interface MathFormulasProps {
  displayMode?: boolean;
}

const MathFormulas: React.FC<MathFormulasProps> = ({ displayMode = false }) => {
  // These are mock components to represent what would be used with a LaTeX library
  // like react-katex or react-latex in a real app
  
  const bayesianFormula = `
    \\begin{align}
    P(A|S,D,H,T) &= w_s \\cdot P(S|A) + w_d \\cdot P(D|A) + w_h \\cdot P(H|A) + w_t \\cdot P(T|A) \\\\
    \\text{where:} \\\\
    P(X|A) &= \\exp\\left(-\\frac{(X - \\mu)^2}{2\\sigma^2}\\right)
    \\end{align}
  `;
  
  const formulaDescription = (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Formula Explanation:</h3>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li><strong>$P(A|S,D,H,T)$</strong>: The probability of becoming an All-Star (A) given the player's Shooting (S), Defense (D), Hustle (H), and Team Fit (T).</li>
        <li><strong>$w_s, w_d, w_h, w_t$</strong>: The weights assigned to each attribute, representing their relative importance.</li>
        <li><strong>$P(S|A), P(D|A), P(H|A), P(T|A)$</strong>: The likelihood of observing each attribute value in an All-Star player.</li>
        <li><strong>$X$</strong>: A generic attribute value (can be S, D, H, or T).</li>
        <li><strong>$\mu$</strong>: The mean (average) value of the attribute among All-Stars.</li>
        <li><strong>$\sigma$</strong>: The standard deviation, representing the spread of attribute values (set to 15 in our model).</li>
      </ul>
    </div>
  );
  
  const nbaAnalogy = (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">NBA Basketball Analogy</h3>
      <p>
        Think of this like NBA scouts evaluating a rookie prospect. Just as Steph Curry is evaluated differently than Giannis Antetokounmpo, 
        our model compares various aspects of a player's game to what successful All-Stars typically demonstrate.
      </p>
      <p className="mt-2">
        Each team may value different skills - just like how the "Splash Brothers" Warriors prioritized 3-point shooting, 
        while the defensive-minded "Bad Boys" Pistons valued tenacity and defense. Our model lets you adjust these weights.
      </p>
    </div>
  );
  
  return (
    <div className={`math-formulas ${displayMode ? 'p-6 bg-white rounded-lg shadow-md' : ''}`}>
      <div className="formula-container p-4 bg-gray-100 rounded-lg overflow-x-auto">
        <pre className="text-center whitespace-pre-wrap">
          {bayesianFormula}
        </pre>
      </div>
      {formulaDescription}
      {nbaAnalogy}
    </div>
  );
};

export default MathFormulas;