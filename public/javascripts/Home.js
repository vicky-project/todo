import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
	constructor() {
		super()
		this.setTitle("Home")
	}

	async getHtml() {
		const html = await fetch('../views/home.html').then(res=>res.text())
		return await html
	}

	checkDom() {}
}