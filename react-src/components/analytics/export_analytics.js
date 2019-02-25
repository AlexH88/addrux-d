import React, { Component } from 'react';
import Select from 'react-select';


class ExportAnalitycs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			select: { value: 'XLS', label: 'XLS' }
		}
	}

	render() {
		const formats = [
			{ value: 'XLS', label: 'XLS' },
			{ value: 'PDF', label: 'PDF' },
			{ value: 'CSV', label: 'CSV' }
		];

		return (
			<div className="react-modal__wrapper">
				<div className="react-modal__header">
					<h2>Export analytics PDF, XLS, CSV</h2>
				</div>

				<div className="export__select-format">
					<label>Select format</label>
					<Select
						name='select-format'
						value={this.state.select}
						options={formats}
						onChange={(value) => this.setState({ select: value })} />
				</div>

				<div className="react-modal__button">
					<button onClick={this.props.onClose} action='submit'>DOWNLOAD</button>
				</div>
			</div>
		);
	}
}

export default ExportAnalitycs;