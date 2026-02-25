import React, { useEffect, useState } from 'react';


const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
  const url = `https://${endpoint}`;

  useEffect(() => {
    console.log('Fetching Activities from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        setLoading(false);
        console.log('Fetched Activities:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching activities:', err);
      });
  }, [url]);

  return (
    <div>
      <h2>Activities</h2>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <ul>
          {activities.map((activity, idx) => (
            <li key={activity.id || idx}>{JSON.stringify(activity)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activities;
