import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './assets/components/Card.jsx';
import conditionCodes from './assets/helpers/conditionCodes.js';
import key from './assets/helpers/key.js';
import url from './assets/helpers/url.js';
import {
	atmosphereSvg,
	clearSvg,
	cloudSvg,
	drizzleSvg,
	rainSvg,
	snowSvg,
	thunderstormSvg,
} from './assets/images/index.js';

import './App.css';
import Loading from './assets/components/Loading.jsx';
import Error from './assets/components/Error.jsx';
const initialState = {
	latitude: 0,
	longitude: 0,
};

const icons = {
	thunderstorm: thunderstormSvg,
	drizzle: drizzleSvg,
	rain: rainSvg,
	snow: snowSvg,
	atmosphere: atmosphereSvg,
	clear: clearSvg,
	clouds: cloudSvg,
};

function App() {
	const [coords, setCoords] = useState(initialState);
	const [weather, setWeather] = useState({});
	const [toggle, setToggle] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [error1, setError1] = useState(null);

	useEffect(() => {
		setError1(null);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setCoords({ latitude, longitude });
			},
			(error) => {
				setError1(error);
			},
		);
	}, []);

	useEffect(() => {
		setError(null);
		setLoading(true);
		if (coords) {
			axios
				.get(
					`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`,
				)
				.then((res) => {
					const keys = Object.keys(conditionCodes);
					const iconName = keys.find((key) =>
						conditionCodes[key].includes(res.data?.weather[0]?.id),
					);
					setWeather({
						city: res.data?.name,
						country: res.data?.sys?.country,
						icon: icons[iconName],
						main: res.data?.weather[0]?.main,
						wind: res.data?.wind?.speed,
						clouds: res.data?.clouds?.all,
						pressure: res.data?.main?.pressure,
						temp: Math.floor(res.data?.main?.temp - 273.15),
					});
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [coords]);

	return (
		<div>
			{error1 && <p>{error1}</p>}
			{loading ? (
				<Loading />
			) : (
				<div>
					{error ? (
						<Error />
					) : (
						<Card weather={weather} toggle={toggle} setToggle={setToggle} />
					)}
				</div>
			)}
		</div>
	);
}
export default App;
