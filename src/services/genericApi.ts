// BASIC REQUESTS

/* export async function getWeatherByCity(city: string): Promise<CurrentWeatherByCity> {
    let result = {} as CurrentWeatherByCity;
    try {
        result = await HttpGet<CurrentWeatherByCity>(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no}`,
        );
    } catch (e) {
        console.log('HttpGet, ', e);
        notification.open({
            description: 'HttpGet, ' + e,
            message: 'Request Error',
        });
    }

    return result;
} */

export {};
