import React, { useEffect, useState } from 'react';
import './Recommendations.css';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Imprimir los datos para ver la estructura
        if (Array.isArray(data.persons)) {
          setRecommendations(data.persons);
        } else {
          console.error('Expected an array for persons, but got:', data.persons);
          setError('Unexpected data format');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      });
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="header">Recomendaciones</h1>
      <ul>
        {recommendations.length > 0 ? (
          recommendations.map(person => (
            <li key={person.personID} className="card">
              <h2>{person.name}</h2>
              <p><strong>First Name:</strong> {person.first}</p>
              <p><strong>Last Name:</strong> {person.last}</p>
              <p><strong>Middle Name:</strong> {person.middle || 'N/A'}</p>
              <p><strong>Email:</strong> {person.email}</p>
              <p><strong>Phone:</strong> {person.phone}</p>
              <p><strong>Fax:</strong> {person.fax}</p>
              <p><strong>Title:</strong> {person.title}</p>
            </li>
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </ul>
    </div>
  );
}

export default Recommendations;
