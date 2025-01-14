import React from 'react';
import { ActivityIndicator } from 'react-native';

import { SongContext } from '~/contexts/song';
import Player from '~/utils/player';
import IconButton from '~/components/button/IconButton';

const PlayButton = ({ style = {}, size, color }) => {
	const song = React.useContext(SongContext)
	const [icon, setIcon] = React.useState('pause')
	const timeout = React.useRef(null)

	React.useEffect(() => {
		clearTimeout(timeout.current)

		switch (song.state) {
			case Player.State.Playing:
				setIcon('pause')
				break
			case Player.State.Paused:
				setIcon('play')
				break
			case Player.State.Stopped:
				setIcon('play')
				break
			case Player.State.Error:
				setIcon('warning')
				break
			case Player.State.Loading:
				timeout.current = setTimeout(() => {
					setIcon('loading')
				}, 500)
				break
			default:
				break
		}
	}, [song.state])

	const onPress = () => {
		if (song.state === Player.State.Error) {
			Player.reload()
		} if (song.state === Player.State.Playing) {
			Player.pauseSong()
		} else {
			Player.resumeSong()
		}
	}

	if (icon === 'loading') {
		return <ActivityIndicator size={'small'} color={color} style={style} />
	}
	return (
		<IconButton
			style={[style]}
			onPress={onPress}
			size={size}
			icon={icon}
			color={color}
		/>
	)
}

export default PlayButton;