import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App: React.FC = () => {
  return (
    <div className='input-group'>
      <label htmlFor='name'>Назначение</label>
      <input type='text' id='name' name='name' />
      <label htmlFor='length'>Длина</label>
      <input type='text' id='length' name='length' />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
