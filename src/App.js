import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('id', id);
    formData.append('data', file);

    try {
      const response = await axios.post('https://awakenart.app.n8n.cloud/webhook-test/06696ea7-9dc7-464a-873b-3feb095b0874', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Upload successful! Your SEO recommendations will be processed shortly.');
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="branding">
          <h1>Awaken Art</h1>
          <p className="tagline">Marketing Automation Page</p>
        </div>
        
        <div className="form-container">
          <h2>VidIQ SEO Automation</h2>
          <p className="instruction">
            Please enter the ID sent to email and upload your CSV file containing keyword recommendations.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id">Script ID:</label>
              <input
                type="number"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter the ID from your email"
                required
              />
              <small className="warning">⚠️ Please ensure you enter the correct ID sent to your email</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="data">VidIQ CSV Export:</label>
              <input
                type="file"
                id="data"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <small className="help-text">Upload your VidIQ keyword recommendations CSV file</small>
            </div>

            <button type="submit">Send Recommendations</button>
          </form>
          
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default App; 
