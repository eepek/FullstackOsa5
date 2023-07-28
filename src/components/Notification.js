const Notification = ({message, type}) => {
    let infoColor =  (type === 'error') ? '#D71313' : '#1A5D1A'

		if (!message) {
      return
    }

    const boxStyle = {
			backgroundColor: '#D8D8D8',
			borderRadius: '15px',
			borderWidth: '2px',
			borderStyle: 'solid',
			borderColor: infoColor,
			padding: '3px',
			margin: '5px'}

		const textStyle = {
			color: infoColor
		}

    return (
        <div style={boxStyle}>
            <p style={textStyle}>{message}</p>
        </div>
        )
}

export default Notification