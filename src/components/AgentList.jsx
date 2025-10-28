import React from 'react';
import './../css/AgentList.css';

const AgentList = () => 
{
  const agents = [
    { 
      id: 1, 
      name: 'Agent 1', 
      email: 'agent1@email.com', 
      phone: '(xxx)-xxx-xxxx',
      about: 'Agent 1 is the visionary of the group, always looking ahead to market trends and new opportunities. Their innovative approach and strategic thinking allow clients to see the bigger picture when buying or selling a property. By combining industry knowledge with genuine care for people, Agent 1 ensures every client feels both supported in the moment and prepared for the future.'
    },
    { 
      id: 2, 
      name: 'Agent 2', 
      email: 'agent2@email.com', 
      phone: '(xxx)-xxx-xxxx',
      about: 'Agent 2 is the visionary of the group, always looking ahead to market trends and new opportunities. Their innovative approach and strategic thinking allow clients to see the bigger picture when buying or selling a property. By combining industry knowledge with genuine care for people, Agent 2 ensures every client feels both supported in the moment and prepared for the future.'
    },
    { 
      id: 3, 
      name: 'Agent 3', 
      email: 'agent3@email.com', 
      phone: '(xxx)-xxx-xxxx',
      about: 'Agent 3 is the visionary of the group, always looking ahead to market trends and new opportunities. Their innovative approach and strategic thinking allow clients to see the bigger picture when buying or selling a property. By combining industry knowledge with genuine care for people, Agent 3 ensures every client feels both supported in the moment and prepared for the future.'
    },
    { 
      id: 4, 
      name: 'Agent 4', 
      email: 'agent4@email.com', 
      phone: '(xxx)-xxx-xxxx',
      about: 'Agent 4 is the visionary of the group, always looking ahead to market trends and new opportunities. Their innovative approach and strategic thinking allow clients to see the bigger picture when buying or selling a property. By combining industry knowledge with genuine care for people, Agent 4 ensures every client feels both supported in the moment and prepared for the future.'
    },
    { 
      id: 5, 
      name: 'Agent 5', 
      email: 'agent5@email.com', 
      phone: '(xxx)-xxx-xxxx',
      about: 'Agent 5 is the visionary of the group, always looking ahead to market trends and new opportunities. Their innovative approach and strategic thinking allow clients to see the bigger picture when buying or selling a property. By combining industry knowledge with genuine care for people, Agent 5 ensures every client feels both supported in the moment and prepared for the future.'
    },
    { 
      id: 6, 
      name: 'Agent 6', 
      email: 'agent6@email.com', 
      phone: '(xxx)-xxx-xxxx',
      about: 'Agent 6 is the visionary of the group, always looking ahead to market trends and new opportunities. Their innovative approach and strategic thinking allow clients to see the bigger picture when buying or selling a property. By combining industry knowledge with genuine care for people, Agent 6 ensures every client feels both supported in the moment and prepared for the future.'
    }
  ];

  return (
    <div className="agent-list-container">
      {agents.map((agent) => (
        <div key={agent.id} className="agent-detail-card">
          <div className="agent-left-section">
            <div className="agent-profile-image">
              <div className="agent-icon">👤</div>
            </div>
            <h3 className="agent-display-name">{agent.name}</h3>
            <h4 className="agent-contact-header">Contact {agent.name}</h4>
            <p className="agent-email">{agent.email}</p>
            <p className="agent-phone">{agent.phone}</p>
          </div>
          <div className="agent-divider"></div>
          <div className="agent-right-section">
            <h3 className="agent-about-title">About</h3>
            <p className="agent-about-text">{agent.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentList;