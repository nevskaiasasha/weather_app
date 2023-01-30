// import {
//   initialisation,
//   getLocation,
//   showWeather,
//   addCity,
//   showCity,
//   createMap,
// } from './index';

// describe('showWeather', () => {
//   beforeEach(() => {
//     fetch.doMock();
//   });

//   it('API works', async () => {
//     fetch.resetMocks();
//     fetch.dontMock();

//     const weather = await showWeather('London');
//     const getFetch = fetch.mock.calls[0][0];
//     const fetchRes = fetch.mock.results[0].value;
//     expect(fetchRes).toBeInstanceOf(Promise);

//     const fetchValue = await fetchRes;

//     expect(fetchValue.status).toBe(200);
//     expect(getFetch).toContain('api.openweathermap.org');
//     expect(Object.keys(weather)).toEqual(
//       expect.arrayContaining(['main', 'weather']),
//     );
//   }, 50000);
// });

// describe('createMap', () => {
//   const params = {
//     lat: 33,
//     lon: 33,
//     size: { height: 500, width: 500 },
//     z: 12,
//   };

//   beforeEach(() => {
//     fetch.doMock();
//   });

//   afterEach(() => {
//     fetch.resetMocks();
//   });

//   it('returns correct src', async () => {
//     const src = await createMap(params);
//     expect(src.startsWith('https://static-maps.yandex.ru')).toBeTruthy();
//   });
// });

// describe('getLocation', () => {
//   beforeAll(() => {
//     fetch.doMock();
//   });

//   afterEach(() => {
//     fetch.resetMocks();
//   });

//   it('returns London', async () => {
//     fetch.mockResolvedValue({
//       json: () => Promise.resolve({ city: 'London' }),
//       status: 200,
//     });
//     await expect(getLocation()).resolves.toBe('London');
//   });
// });

// describe('addCity', () => {
//   beforeEach(() => {
//     localStorage.clear();
//   });

//   afterAll(() => {
//     localStorage.clear();
//   });
// });

// it('adds London to local storage', () => {
//   const cityName = 'Sydney';
//   addCity(cityName);
//   expect(showCity().toContain(cityName));
// });

// it('adds London once', () => {
//   const cityName = 'London';
//   for (let i = 0; i < 5; i += 1) {
//     addCity(cityName);
//   }

//   const cityCounter = (prev, cur) => (cur === cityName ? prev + 1 : prev);
//   expect(initialisation().reduce(cityCounter, 0)).toBe(1);
// });

// it('adds 3 different cities', () => {
//   const cityName = 'London';
//   for (let i = 0; i < 3; i += 1) {
//     addCity(cityName + i);
//   }
//   expect(initialisation()).toHaveLength(3);
// });
