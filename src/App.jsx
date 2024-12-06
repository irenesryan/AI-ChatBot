import { useRef, useState } from 'react';
import './App.css';
import { SearchBox, initializeIcons } from '@fluentui/react';

initializeIcons();

// Access the environment variables
const projectId = import.meta.env.VITE_REACT_APP_PROJECT_ID;
const agentId = import.meta.env.VITE_REACT_APP_AGENT_ID;

function App() {

  const [submittedQuery, setSubmittedQuery] = useState('');
  const [matchFound, setMatchFound] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef(null);

  // Custom styles for the SearchBox
  const searchBoxStyles = {
    root: {
      width: 200, // Set the width of the SearchBox
      backgroundColor: '#f5f5f5',
      paddingLeft: '10px',
      border: 'none',
      color: '#323130',
      fontSize: '16px',
      fontWeight: 500,
      ':after': {
          border: "none",
          borderTop: '0px solid transparent',
          borderBottom: '0px solid transparent',
          borderRight: '0px solid transparent',
          borderLeft: '0px solid transparent',
        },
    },
    iconContainer: {
      color: 'grey',
      display: 'none',
    },
  };

  const gitcommands = [
    'git', 'git clone', 'git checkout', 'git commit',
    'git fetch', 'git push', 'git pull', 'git merge',
    'git branch', 'git push origin master',
  ];

  // Handle input changes
  const handleChange = (_, newValue) => {
    setSubmittedQuery(newValue); // Update the state on each keystroke to keep the input responsive
    if (!newValue) {
      setHasSearched(false);
      setMatchFound([]); // Clear the matchFound state
    }
  };

  // Handle search submit
  const handleSearchSubmit = (value) => {
    setHasSearched(true); // Set the hasSearched state to true when the
    
    // Check if the typed git command exists in the array
    const matchFound = gitcommands.find((gitcmd) =>
      gitcmd.toLowerCase() === value.toLowerCase()
    );
    if (matchFound) {
      setMatchFound(
        <span>
          Yes, match found: <b style={{ fontWeight: 'bold' }}>{matchFound}</b> is a git command
        </span>,
      );
    } else {
      setMatchFound('No match found'); // Clear the state if no match is found
    }

    setSubmittedQuery(value);
  };

  // Clear the search input
  const handleClear = () => {
    setSubmittedQuery('');
    setMatchFound([]);
    setHasSearched(false);

    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <div style={{ background: '#f5f5f5', paddingBottom: '30px', marginTop: '50px' }}>
      <div style={{ marginBottom: 20, background: '#f5f5f5', color: 'grey', padding: '25px' }}>
        <h2>AI Chatbot with custom knowledge base</h2>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#b0a196',
          padding: '5px',
          paddingBottom: '20px',
          flexDirection: 'column',
        }}
      >
        <div><h3 style={{ color: 'black', padding: '10px' }}>Search Git Command</h3></div>
        <SearchBox
          componentRef={searchRef}
          placeholder="Search here..."
          onSearch={handleSearchSubmit} //trigger search on enter key
          onChange={handleChange}
          value={submittedQuery}
          onClear={handleClear}
          styles={searchBoxStyles}
        />
      </div>

      <br />

      {hasSearched && matchFound && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ccb6c9',
        }}
        >
          <h5 style={{ padding: '14px' }}>Search Value</h5>
          <p style={{
            fontSize: '14px',
            border: '1px solid #0078d4',
            borderRadius: '5px',
            padding: '7px',
          }}
          >
            {matchFound}
          </p>
        </div>
      )}

      <div>
        <df-messenger
          className="df-messenger"
          project-id={projectId}
          agent-id={agentId}
          language-code="en"
          max-query-length="-1"
          style={{
            bottom: '20px', right: '40px', position: 'fixed',
          }}
        >
          <df-messenger-chat-bubble chat-title="test pro agent" />
        </df-messenger>
      </div>
    </div>
  );
}

export default App;
