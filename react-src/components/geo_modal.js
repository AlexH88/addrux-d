import React, { Component } from 'react';

class SocialModal extends Component {
	render() {
		console.log('[RENDER] GeoModal - ./geo_modal.js');
		
		return (
			<div className="react-modal__wrapper geo-modal">
				<div className="react-modal__header">
					<h2>Please confirm on your smartphone New Geolocation</h2>
				</div>

				<div className="social-modal__description">
					<div className="description__text">
						<div>Open instagram on your Smartphone and press button "Confirm"</div>
					</div>
				</div>

        <div className="react-modal__button">
          <button>READY</button>
        </div>
			</div>
		);
	}
}

export default SocialModal;