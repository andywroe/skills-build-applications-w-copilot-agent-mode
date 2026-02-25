import React, { useEffect, useState } from 'react';


const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
  const url = `https://${endpoint}`;

  useEffect(() => {
    console.log('Fetching Teams from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        setLoading(false);
        console.log('Fetched Teams:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching teams:', err);
      });
  }, [url]);

  return (
    <div>
      <h2>Teams</h2>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <ul>
          {teams.map((team, idx) => (
            <li key={team.id || idx}>{JSON.stringify(team)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Teams;
