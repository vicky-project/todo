import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
	constructor() {
		super()
		this.setTitle("Todo")
	}

	async getHtml() {
		const html = await fetch('/views/todo.html').then(res=>res.text())
		return await html
	}

	async checkDom() {
		const data = await fetch('/api/read').then(res=>res.json()).then(data=>{
			let html = ''
			if(data.length > 0) {
				html += `<ul id="todo-list">`
				data.forEach((key, i)=>{
					html += `<li data-id="${key.id}" class="todo-item">${key.todo_name}<br><small  style="font-size: 15px">created at: ${new Date(key.created_at).toLocaleString()}</small></li>`
				})
				html += `</ul>`
			} else {
				html += `<p class="no-todo">Whooaa!! Nothing left todo. Congratulation.</p>`
			}
			document.querySelector(".todo-list").innerHTML = html
		}).catch(err=>console.log(err))
	}
}