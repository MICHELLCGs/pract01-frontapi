import React, { useEffect, useState } from 'react';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la API utilizando la variable de entorno
    fetch(process.env.REACT_APP_API_URL)
      .then(response => response.json())
      .then(data => {
        setRecommendations(data.recommendations);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Esta es mi Recommendations </h1>
      <ul>
        {recommendations.map(person => (
          <li key={person.person_ID}>
            <h2>{person.name}</h2>
            <p><strong>First Name:</strong> {person.first}</p>
            <p><strong>Last Name:</strong> {person.last}</p>
            <p><strong>Middle Name:</strong> {person.middle || 'N/A'}</p>
            <p><strong>Email:</strong> {person.email}</p>
            <p><strong>Phone:</strong> {person.phone}</p>
            <p><strong>Fax:</strong> {person.fax}</p>
            <p><strong>Title:</strong> {person.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
