const API_KEY = 'demo'; // In a real app, you'd use a proper API key
let weatherData = {};

// Sample weather data for demonstration
const sampleData = {
    'Amhedabad': {
        current: {
            location: 'Amhedabad',
            temperature: 18,
            description: 'partly cloudy',
            icon: '⛅',
            humidity: 65,
            windSpeed: 12,
            pressure: 1013,
            visibility: 10,
            uvIndex: 4,
            feelsLike: 20
        },
        forecast: [
            { day: 'Today', icon: '⛅', high: 20, low: 15, desc: 'Partly Cloudy' },
            { day: 'Tomorrow', icon: '🌧️', high: 17, low: 12, desc: 'Light Rain' },
            { day: 'Wednesday', icon: '☀️', high: 22, low: 16, desc: 'Sunny' },
            { day: 'Thursday', icon: '🌤️', high: 19, low: 14, desc: 'Partly Sunny' },
            { day: 'Friday', icon: '🌧️', high: 16, low: 11, desc: 'Rainy' }
        ]
    },
    'Mumbai': {
        current: {
            location: 'Mumbai',
            temperature: 24,
            description: 'sunny',
            icon: '☀️',
            humidity: 55,
            windSpeed: 8,
            pressure: 1018,
            visibility: 15,
            uvIndex: 7,
            feelsLike: 26
        },
        forecast: [
            { day: 'Today', icon: '☀️', high: 26, low: 20, desc: 'Sunny' },
            { day: 'Tomorrow', icon: '🌤️', high: 23, low: 18, desc: 'Partly Sunny' },
            { day: 'Wednesday', icon: '⛅', high: 21, low: 16, desc: 'Cloudy' },
            { day: 'Thursday', icon: '🌧️', high: 19, low: 14, desc: 'Thunderstorms' },
            { day: 'Friday', icon: '⛅', high: 20, low: 15, desc: 'Partly Cloudy' }
        ]
    },
    'Assam': {
        current: {
            location: 'Assam',
            temperature: 28,
            description: 'clear sky',
            icon: '☀️',
            humidity: 70,
            windSpeed: 5,
            pressure: 1020,
            visibility: 12,
            uvIndex: 8,
            feelsLike: 32
        },
        forecast: [
            { day: 'Today', icon: '☀️', high: 30, low: 25, desc: 'Hot' },
            { day: 'Tomorrow', icon: '🌤️', high: 29, low: 24, desc: 'Partly Sunny' },
            { day: 'Wednesday', icon: '🌧️', high: 26, low: 22, desc: 'Heavy Rain' },
            { day: 'Thursday', icon: '⛈️', high: 24, low: 20, desc: 'Thunderstorms' },
            { day: 'Friday', icon: '⛅', high: 27, low: 23, desc: 'Partly Cloudy' }
        ]
    },
    'Rajasthan': {
        current: {
            location: 'Rajasthan',
            temperature: 38,
            description: 'clear sky',
            icon: '☀️',
            humidity: 70,
            windSpeed: 5,
            pressure: 1020,
            visibility: 12,
            uvIndex: 8,
            feelsLike: 32
        },
        forecast: [
            { day: 'Today', icon: '☀️', high: 30, low: 25, desc: 'Hot' },
            { day: 'Tomorrow', icon: '🌤️', high: 29, low: 24, desc: 'Partly Sunny' },
            { day: 'Wednesday', icon: '🌧️', high: 26, low: 22, desc: 'Heavy Rain' },
            { day: 'Thursday', icon: '⛈️', high: 24, low: 20, desc: 'Thunderstorms' },
            { day: 'Friday', icon: '⛅', high: 27, low: 23, desc: 'Partly Cloudy' }
        ]
    }
};

function showLoading() {
    document.getElementById('weatherContainer').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading weather data...</p>
        </div>
    `;
}

function showError(message) {
    document.getElementById('weatherContainer').innerHTML = `
        <div class="error">
            <h3>❌ Error</h3>
            <p>${message}</p>
        </div>
    `;
}

function displayWeather(data) {
    const container = document.getElementById('weatherContainer');
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    container.innerHTML = `
        <div class="weather-card">
            <div class="current-weather">
                <div class="location">${data.current.location}</div>
                <div class="date">${currentDate}</div>
                
                <div class="weather-main">
                    <div class="temperature">${data.current.temperature}°C</div>
                    <div class="weather-icon">${data.current.icon}</div>
                </div>
                
                <div class="weather-description">${data.current.description}</div>
                
                <div class="weather-details">
                    <div class="detail-item">
                        <div class="detail-label">Feels Like</div>
                        <div class="detail-value">${data.current.feelsLike}°C</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Humidity</div>
                        <div class="detail-value">${data.current.humidity}%</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Wind Speed</div>
                        <div class="detail-value">${data.current.windSpeed} km/h</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Pressure</div>
                        <div class="detail-value">${data.current.pressure} mb</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Visibility</div>
                        <div class="detail-value">${data.current.visibility} km</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">UV Index</div>
                        <div class="detail-value">${data.current.uvIndex}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="weather-card">
            <div class="forecast-container">
                <h2 class="forecast-title">📅 5-Day Forecast</h2>
                <div class="forecast-grid">
                    ${data.forecast.map(day => `
                        <div class="forecast-item">
                            <div class="forecast-day">${day.day}</div>
                            <div class="forecast-icon">${day.icon}</div>
                            <div class="forecast-temps">
                                <span><strong>${day.high}°</strong></span>
                                <span style="opacity: 0.7">${day.low}°</span>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8;">${day.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim().toLowerCase();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    // Simulate API delay
    setTimeout(() => {
        if (sampleData[city]) {
            displayWeather(sampleData[city]);
        } else {
            // Generate random weather data for unknown cities
            const randomData = generateRandomWeather(city);
            displayWeather(randomData);
        }
    }, 1000);
}

function generateRandomWeather(city) {
    const icons = ['☀️', '⛅', '🌤️', '🌧️', '⛈️', '🌨️'];
    const descriptions = ['sunny', 'partly cloudy', 'cloudy', 'rainy', 'stormy', 'snowy'];
    const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'];
    
    const randomTemp = Math.floor(Math.random() * 30) + 5;
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

    return {
        current: {
            location: city.charAt(0).toUpperCase() + city.slice(1),
            temperature: randomTemp,
            description: randomDesc,
            icon: randomIcon,
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            pressure: Math.floor(Math.random() * 50) + 1000,
            visibility: Math.floor(Math.random() * 10) + 5,
            uvIndex: Math.floor(Math.random() * 10) + 1,
            feelsLike: randomTemp + Math.floor(Math.random() * 6) - 3
        },
        forecast: days.map(day => ({
            day: day,
            icon: icons[Math.floor(Math.random() * icons.length)],
            high: randomTemp + Math.floor(Math.random() * 8) - 4,
            low: randomTemp - Math.floor(Math.random() * 8) - 2,
            desc: descriptions[Math.floor(Math.random() * descriptions.length)]
        }))
    };
}

// Allow Enter key to trigger search
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Load default city on page load
window.onload = function() {
    document.getElementById('cityInput').value = 'Mumbai';
    getWeather();
};