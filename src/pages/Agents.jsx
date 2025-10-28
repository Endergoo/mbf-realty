import React from 'react';
import AgentList from './../components/AgentList';
import AgentFooter from './../components/AgentFooter';

const Agents = () => 
{
  return (
    <>
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">Our Agents</h1>
          <p className="page-text" style={{textAlign: 'center', marginBottom: '3rem'}}>
            Meet our experienced team of real estate professionals dedicated to 
            helping you find your dream home.
          </p>
          <AgentList />
        </div>
      </div>
      <AgentFooter />
    </>
  );
};

export default Agents;