import { useRef, useState } from 'react';
import './App.css';
import { SearchBox, initializeIcons } from '@fluentui/react';

initializeIcons();

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
      display:'none'
    }
  };
  
  // Array of country names
  const countries = [
    "United States", "Canada", "Mexico", "Brazil", "Argentina",
    "France", "Germany", "Spain", "Sweden", "Italy", "United Kingdom",
    "China", "Japan", "South Korea", "India", "Australia",
    "New Zealand", "South Africa", "Egypt", "Nigeria", "Kenya"
  ];

  // function - 1
  const handleChange = (_, newValue) => {
    setSubmittedQuery(newValue); // Update the state on each keystroke to keep the input responsive
    if (!newValue) {
      setHasSearched(false);
      setMatchFound(''); // Clear the matchFound state when the input is empty
    }
  };

  // function - 2
  const handleSearchSubmit = (value) => {
    setHasSearched(true); // Set the hasSearched state to true when the
    
    // Check if the typed country name exists in the array
    const matchFound = countries.find((country) =>
      country.toLowerCase() === value.toLowerCase()
    );
    if (matchFound) {
      setMatchFound(`Yes, match found: ${matchFound}`); // Update the state with the matched country name
    } else {
      setMatchFound('No match found'); // Clear the state if no match is found
    }
    
    setSubmittedQuery(value); //store the value only on enter key
  }

  // function - 3
  const handleClear = () => {
    setSubmittedQuery('');
    setMatchFound('');
    setHasSearched(false);

    if (searchRef.current) {
      searchRef.current.focus();
    }
  }  

  return (
    <div style={{background:'#f5f5f5'}}>
      <div style={{marginBottom:30, background:'grey'}}>
        <h1 style={{color:'black', padding:'10px'}}>Fluent UI SearchBox Test</h1>
      </div>

      <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'#b0a196', padding:'5px'}}>
        <h5 style={{padding:'5px', paddingRight:'10px', fontSize:'15px'}}>Search Box</h5>
        <SearchBox
          componentRef={searchRef}
          placeholder='Search here...'
          onSearch={handleSearchSubmit} //trigger search on enter key
          onChange={handleChange}
          value={submittedQuery}
          onClear={handleClear}
          styles={{...searchBoxStyles}}
        />
      </div>
      <div>
      <df-messenger
          className="df-messenger"
          project-id="testpro-441710"
          agent-id="fe947209-7963-425f-b1be-7d1aa2ddb7f7"
          language-code="en"
          max-query-length="-1"
          style={{bottom: '20px', right: '40px', position: 'fixed' }}
        >
          <df-messenger-chat-bubble chat-title="test pro agent"></df-messenger-chat-bubble>
        </df-messenger>
      </div>
      
      <br />
      {/* Conditionally render the matched country result in a styled text box */}
      {
        hasSearched && matchFound && (
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'#ccb6c9'}}>
            <h5 style={{padding:'14px'}}>Search Value</h5>
            <p style={{fontSize:'14px', border: '1px solid #0078d4', borderRadius: '5px', padding: '7px'}}>{matchFound}</p>
          </div>
        )
      }
    </div>
  );
}
export default App;