import { useState, useEffect } from 'react'
import '../styles/Cart.css'

function Cart({ cart, updateCart }) {
	const [isOpen, setIsOpen] = useState(true)
	const total = cart.reduce(
		(acc, plantType) => acc + plantType.amount * plantType.price,
		0
	)
	useEffect(() => {
		document.title = `LMJ: ${total}€ d'achats`
	}, [total])

	function removeToCart(name, price) {
		const currentPlantRemove = cart.find((plant) => plant.name === name)
		if (currentPlantRemove) {
			if (currentPlantRemove.amount < 2) {
				const named = name[0].toUpperCase() + name.slice(1)
				const cartDeleteCurrentPlant = cart.filter(
					(plant) => plant.name !== name
				)
				updateCart([
					...cartDeleteCurrentPlant
				])
			} else {
				const cartFilteredCurrentPlant = cart.filter(
					(plant) => plant.name !== name
				)
				updateCart([
					...cartFilteredCurrentPlant,
					{ name, price, amount: currentPlantRemove.amount - 1 }
				])
			}
		}
	}

	return isOpen ? (
		<div className='lmj-cart'>
			<button
				className='lmj-cart-toggle-button'
				onClick={() => setIsOpen(false)}
			>
				Fermer
			</button>
			{cart.length > 0 ? (
				<div>
					<h2>Panier</h2>
					<ul className='lmj-shoppingList'>
						{cart.map(({ name, price, amount }, index) => (
							<div key={`${name}-${index}`}>
								{name} {price}€ x {amount}
								<button className='lmj-cart-button' onClick={() => removeToCart(name, price)}>Supprimer</button>
							</div>
						))}
					</ul>
					<h3>Total : {total}€</h3>
					<button className='lmj-cart-button' onClick={() => updateCart([])}>Vider le panier</button>
				</div>
			) : (
				<div>Votre panier est vide</div>
			)}
		</div>
	) : (
		<div className='lmj-cart-closed'>
			<button
				className='lmj-cart-toggle-button'
				onClick={() => setIsOpen(true)}
			>
				Ouvrir le Panier
			</button>
		</div>
	)
}

export default Cart
