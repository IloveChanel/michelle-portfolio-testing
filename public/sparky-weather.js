/* =============================================
   SPARKY WEATHER SERVICE 🌤️⚡
   ============================================= */

class SparkyWeatherService {
    constructor() {
        this.apiKey = 'demo'; // For demo purposes - replace with real API key
        this.cache = new Map();
        this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
    }
    
    async getWeather(location = 'current') {
        try {
            // For demo purposes, return mock weather data
            return this.getMockWeather();
            
            // Uncomment and configure for real weather data:
            /*
            const cachedData = this.getFromCache(location);
            if (cachedData) return cachedData;
            
            let coords = await this.getCoordinates(location);
            if (!coords && location === 'current') {
                coords = await this.getCurrentLocation();
            }
            
            const weatherData = await this.fetchWeatherData(coords);
            this.setCache(location, weatherData);
            return weatherData;
            */
        } catch (error) {
            console.error('Weather fetch error:', error);
            return this.getWeatherError();
        }
    }
    
    getMockWeather() {
        const conditions = [
            { condition: 'sunny', temp: 75, emoji: '☀️', joke: "It's so sunny, even my pixels are getting a tan! 😎" },
            { condition: 'cloudy', temp: 65, emoji: '☁️', joke: "Cloudy with a chance of awesome conversations! 🌤️" },
            { condition: 'rainy', temp: 60, emoji: '🌧️', joke: "It's raining cats and dogs... good thing I'm digital! 🐱🐶" },
            { condition: 'snowy', temp: 30, emoji: '❄️', joke: "Snow joke, it's cold out there! Stay warm! 🧥" },
            { condition: 'windy', temp: 70, emoji: '💨', joke: "It's so windy, my code is getting blown away! 💻💨" }
        ];
        
        const randomWeather = conditions[Math.floor(Math.random() * conditions.length)];
        
        return {
            success: true,
            location: 'Your Area',
            temperature: randomWeather.temp,
            condition: randomWeather.condition,
            emoji: randomWeather.emoji,
            joke: randomWeather.joke,
            message: `Weather Update: ${randomWeather.temp}°F and ${randomWeather.condition} ${randomWeather.emoji}`
        };
    }
    
    getWeatherError() {
        return {
            success: false,
            message: "Oops! My weather sensors are taking a coffee break ☕ Want a weather joke instead?",
            joke: "Why don't clouds ever get speeding tickets? Because they're always under the radar! 📡☁️"
        };
    }
    
    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                error => reject(error),
                { timeout: 10000, enableHighAccuracy: true }
            );
        });
    }
    
    async getCoordinates(location) {
        // Geocoding would go here for real implementation
        // For now, return mock coordinates
        return { lat: 40.7128, lon: -74.0060 }; // NYC coordinates
    }
    
    async fetchWeatherData(coords) {
        // Real API call would go here
        // Example: OpenWeatherMap API
        /*
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}&units=imperial`
        );
        
        if (!response.ok) throw new Error('Weather API request failed');
        
        const data = await response.json();
        return this.formatWeatherData(data);
        */
    }
    
    formatWeatherData(data) {
        const conditionMap = {
            'clear': { emoji: '☀️', jokes: ["It's so clear, I can see your potential from here! 🌟"] },
            'clouds': { emoji: '☁️', jokes: ["Cloudy with a chance of productivity! 💪"] },
            'rain': { emoji: '🌧️', jokes: ["Perfect weather for coding indoors! ☔💻"] },
            'snow': { emoji: '❄️', jokes: ["Let it snow, let it snow, let it code! ❄️👨‍💻"] },
            'thunderstorm': { emoji: '⛈️', jokes: ["Thunderstorms are just nature's way of debugging! ⚡"] }
        };
        
        const condition = data.weather[0].main.toLowerCase();
        const conditionInfo = conditionMap[condition] || { emoji: '🌤️', jokes: ["Weather is weird, but you're awesome! 🎉"] };
        
        return {
            success: true,
            location: data.name,
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            emoji: conditionInfo.emoji,
            joke: conditionInfo.jokes[Math.floor(Math.random() * conditionInfo.jokes.length)],
            message: `${data.name}: ${Math.round(data.main.temp)}°F, ${data.weather[0].description} ${conditionInfo.emoji}`
        };
    }
    
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }
    
    setCache(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }
}

// Weather-related jokes and responses for Sparky
const weatherResponses = {
    jokes: [
        "Why don't weather forecasters ever get parking tickets? Because they always know when it's going to be cloudy! 🌤️",
        "What's the weather's favorite type of music? Rain-B! 🌧️🎵",
        "Why did the weather go to therapy? It had too many mood swings! 🌪️",
        "What do you call a grumpy meteorologist? A storm-trooper! ⛈️",
        "Why don't clouds ever feel lonely? Because they always come in bunches! ☁️☁️",
        "What's a tornado's favorite game? Twister! 🌪️🎮",
        "Why did the sun go to school? To get brighter! ☀️🎓"
    ],
    
    responses: [
        "I'd love to give you real weather data! For now, here's a forecast: 100% chance of awesome! 🌟",
        "Weather update from the digital realm: It's always perfect coding weather! 💻⚡",
        "My weather sensors say it's a great day to explore this portfolio! 🎨",
        "Current conditions: Partly cloudy with scattered moments of brilliance! ✨"
    ]
};

// Export for use in main Sparky chatbot
if (typeof window !== 'undefined') {
    window.SparkyWeatherService = SparkyWeatherService;
    window.weatherResponses = weatherResponses;
}