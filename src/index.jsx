import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

console.log(process.env.NODE_ENV);
ReactDOM.render(<h1 className='hello'>Hello world</h1>, document.getElementById('root'));
