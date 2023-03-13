import React from 'react';
export interface DislikeProps { }

const Dislike: React.FC<DislikeProps> = () => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M16.9999 4H15.9999H6.56995C5.49995 4 4.58995 4.67 4.37995 5.61L3.03995 11.61C2.76995 12.85 3.81995 14 5.22995 14H9.45995L7.93995 18.94C7.61995 19.97 8.45995 21 9.61995 21C10.1999 21 10.7599 20.76 11.1399 20.35L16.9999 14H20.9999V4H16.9999ZM10.3999 19.67C10.2099 19.88 9.91995 20 9.61995 20C9.35995 20 9.11995 19.89 8.98995 19.7C8.91995 19.6 8.83995 19.44 8.89995 19.23L10.4199 14.29L10.8199 13H9.45995H5.22995C4.81995 13 4.42995 12.83 4.19995 12.54C4.07995 12.39 3.94995 12.14 4.01995 11.82L5.35995 5.82C5.45995 5.35 5.96995 5 6.56995 5H15.9999V13.61L10.3999 19.67ZM19.9999 13H16.9999V5H19.9999V13Z" fill="black" />
		</svg>
	);
};

export default Dislike;
