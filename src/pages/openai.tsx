import React, { useState } from 'react';
import axios from 'axios';

const OpenAI = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/generate', {
        prompt: input,
      });

      setOutput(response.data.result);
    } catch (error: any) {
      setError(error.response?.data?.details || error.message || 'An error occurred');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stublab's AI</h1>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your prompt here"
      />
      
      <button
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Submit'}
      </button>

      {error && (
        <div className="text-red-500 mt-4">
          Error: {error}
        </div>
      )}

      {output && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Response:</h2>
          <p className="mt-2 whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAI;