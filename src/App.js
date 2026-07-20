import './App.css'
import Memes from './Memes'
import {useState} from "react"
import {shuffle} from 'lodash'

function App() {
	const [cardDeck, buildCardDeck] = useState(shuffle([...Memes, ...Memes]))
	const [clicks, countClick] = useState(0)
	const [isGameFinished, setGameFinished] = useState(false)
	const [revealedCards, setCardRevealed] = useState([])
	const [foundPairsOfCards, setFoundPairsOfCards] = useState([])

	function revealCard(index) {
		if (isGameFinished) {
			buildCardDeck(shuffle([...Memes, ...Memes]))
			setFoundPairsOfCards([])
			setGameFinished(false)
			countClick(0)
		}
		if (revealedCards.length === 0) setCardRevealed([index])
		if (revealedCards.length === 1) {
			const firstCard = revealedCards[0]
			const secondCard = index
			if (cardDeck[firstCard] === cardDeck[secondCard]) {
				if (foundPairsOfCards.length + 2 === cardDeck.length) setGameFinished(true)
				setFoundPairsOfCards([...foundPairsOfCards, firstCard, secondCard])
			}
			setCardRevealed([...revealedCards, index])
		}
		if (revealedCards.length === 2) setCardRevealed([index])
		countClick(clicks + 1)
	}

	return (
		<div>
			<div className="board">
				{cardDeck.map((card, index) => {
					const cardPlace = (revealedCards.indexOf(index) !== -1) || foundPairsOfCards.indexOf(index) !== -1
					return (
						<div className={"card-places " + (cardPlace ? 'flipped' : '')} onClick={() => revealCard(index)}>
							<div className="cards">
								<div className="front-card">
									<img src={card} alt=""/>
								</div>
								<div className="back-card" />
							</div>
						</div>
					)
				})}
			</div>
			<div className="statistic">
				{isGameFinished && (
					<>You won the game! Congratulations!<br />
						Click any card to play again.<br />
					</>
				)}
				Clicks: {clicks} &nbsp;&nbsp;&nbsp; Found pairs of cards: {foundPairsOfCards.length / 2}
			</div>
		</div>
	)
}

export default App