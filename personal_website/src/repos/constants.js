/* Language color map shared across repos components. */
export const LANG_COLORS = {
  JavaScript: '#f7df1e', Python: '#3572A5', Java: '#b07219',
  TypeScript: '#2b7489', HTML: '#e34c26', CSS: '#563d7c',
  Ruby: '#701516', Go: '#00ADD8', 'C++': '#f34b7d', C: '#555555',
  Haskell: '#5e5086', Erlang: '#B83998', Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B', Prolog: '#74283c',
};

export const langColor = (lang) => LANG_COLORS[lang] || '#666';
