import React from 'react';

function Card({ weather, toggle, setToggle }) {
	const temperature = toggle
		? Math.floor((weather.temp * 9) / 5 + 32)
		: weather.temp;
	return (
		<div className="card">
			<h1 className="card__title">Weather App.</h1>
			<h2 className="card__subtitle">
				{weather.city}, {weather.country}.
			</h2>
			<div className="card__body">
				<img
					src={weather.icon}
					alt={weather.main}
					width={50}
					className="card__icon"
				/>
				<div className="card__info">
					<h3 className="card__main">"{weather.main}"</h3>
					<p className="card__wind-speed">Win Speed: {weather.wind} m/s</p>
					<p className="card__clouds">Clouds {weather.clouds}%</p>
					<p className="card__pressure">Pressure {weather.pressure} hpa</p>
				</div>
			</div>
			<h2 className="card__temperature">
				{temperature}
				{toggle ? '°F' : '°C'}
			</h2>
			<button onClick={() => setToggle(!toggle)} className="card__button">
				Change to {!toggle ? '°F' : '°C'}
			</button>
		</div>
	);
}

export default Card;
