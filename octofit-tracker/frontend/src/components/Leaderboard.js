import React, { useEffect, useState } from 'react';


const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;
  const url = `https://${endpoint}`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        setLoading(false);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching leaderboard:', err);
      });
  }, [url]);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <ul>
          {leaderboard.map((entry, idx) => (
            <li key={entry.id || idx}>{JSON.stringify(entry)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
