const API_SRV = 'http://localhost:8000';
const getDashboardData = () => {
  return fetch(`${API_SRV}/dashboard_data.json`)
    .then(response => response.json())
    .then(data => {
      let metrics = {};
      let charts = {};
      if (data) {
        metrics = data.data ? data.data[0] : {};
        charts = {
          errors_last_3days: data.errors_last_3days,
          errors_yesterday: data.errors_yesterday,
          errors_last_hour: data.errors_last_hour,
          errors_today: data.errors_today,
        };
      }
      return {
        metrics,
        charts,
      };
    });
};

export { getDashboardData };
