document.addEventListener('DOMContentLoaded', function () {
  // Function to update each data card with the appropriate data
  function updateDataCards(data, timeframe) {
    data.forEach((activity) => {
      // Map titles to their corresponding class names
      const activityClassMap = {
        Work: 'work',
        Play: 'play',
        Study: 'study',
        Exercise: 'exercise',
        Social: 'socials', // Mapping "Social" to the correct class "socials"
        'Self Care': 'self-care', // Mapping "Self Care" to the correct class "self-care"
      };

      const className = activityClassMap[activity.title];

      // Find the data card that corresponds to the activity title
      const dataCard = document.querySelector(`.${className}`);

      if (dataCard) {
        // Determine the label for the previous timeframe
        let previousLabel = '';
        if (timeframe === 'daily') {
          previousLabel = 'Last Day';
        } else if (timeframe === 'weekly') {
          previousLabel = 'Last Week';
        } else if (timeframe === 'monthly') {
          previousLabel = 'Last Month';
        }

        // Update the content inside each data card
        dataCard.innerHTML = `
          <div class="img-div">
            <img src="./images/icon-${activity.title
              .toLowerCase()
              .replace(' ', '-')}.svg" alt="${activity.title}">
          </div>
          <div class="data-div">
            <div class="data-header">
              <h3>${activity.title}</h3>
              <img src="./images/icon-ellipsis.svg" alt="expand/more">
            </div>
            <h1 class="duration">${
              activity.timeframes[timeframe].current
            }hrs</h1>
            <p class="previous-data">${previousLabel} - ${
          activity.timeframes[timeframe].previous
        }hrs</p>
          </div>
        `;
      }
    });
  }

  // Fetch the JSON data
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      // Initial load with default weekly timeframe
      updateDataCards(data, 'weekly');

      // Function to handle the switching between timeframes
      function updateTimeframe(event) {
        const timeframe = event.target.classList.contains('daily')
          ? 'daily'
          : event.target.classList.contains('weekly')
          ? 'weekly'
          : 'monthly';
        updateDataCards(data, timeframe);

        //Update active state on the clicked timeframe
        document
          .querySelectorAll('.duration-card h3')
          .forEach((h3) => h3.classList.remove('active'));
        event.target.classList.add('active');
      }

      // Add event listeners to the duration buttons
      document
        .querySelector('.daily')
        .addEventListener('click', updateTimeframe);
      document
        .querySelector('.weekly')
        .addEventListener('click', updateTimeframe);
      document
        .querySelector('.monthly')
        .addEventListener('click', updateTimeframe);
    })
    .catch((error) => console.error('Error loading data:', error));
});
