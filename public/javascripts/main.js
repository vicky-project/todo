import Home from "./Home.js"
import Todo from "./Todo.js"

const navigateTo = url => {
	history.pushState(null, null, url)
	router()
}

const router = async () => {
	const routes = [
		{ path: "/", view: Home },
		{ path: "/todo", view: Todo }
	];

	const potentialMatches = routes.map(route=>{
		return {
			route: route,
			isMatch: location.pathname === route.path
		}
	})

	let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

	if(!match) {
		match = {
			route: routes[0],
			isMatch: true
		}
	}

	const view = new match.route.view()

	document.querySelector("#app").innerHTML = await view.getHtml()
	view.checkDom()
	// console.log(match.route.view())
}

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", e => {
		if(e.target.matches("[data-link]")) {
			e.preventDefault()
			navigateTo(e.target.href)
		}

		if(e.target.classList.contains('todo-item')) {
      if(!confirm("Are you sure to delete this todo ?")) return false;
      const item = e.target.dataset.id
      fetch(`/api/todo/${item}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
      },
      }).then(res=>res.json()).then(data=>{
        e.target.remove()
        toast("Berhasil menghapus 1 item")
        let todoEl = document.getElementById("todo-list")
        // console.log(todoEl)
        if(todoEl.children.length === 0) {
        	document.querySelector('.todo-list').innerHTML = `<p class="no-todo">Whooaa!! Nothing left todo. Congratulation.</p>`
        }
      })
    }
	})

	document.body.addEventListener("submit", e => {
		e.preventDefault()
		let form = document.querySelector('form')
    fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `todo_name=${form.item.value}`
    }).then(res=>res.json()).then(data=>{
      history.pushState({todos: data},'',document.location)
      toast("Berhasil menambahkan 1 item")
      let todo = document.getElementById("todo-list")
      if(todo) {
      	let li = document.createElement('li')
	      li.dataset.id = data.id
	      li.className = 'todo-item'
	      li.innerHTML = data.todo_name + `<br><small style="font-size:15px;">created at: ${new Date(data.created_at).toLocaleString()}</small>`
      	todo.appendChild(li)
      } else {
      	let list = document.querySelector(".todo-list")
      	list.innerHTML = `<ul id="todo-list"><li data-id="${data.id}" class="todo-item">${data.todo_name}<br><small style="font-size:15px;">created at: ${new Date(data.created_at).toLocaleString()}</small></li></ul>`
      }
    })
	})

	router()
})

// Toast message
function toast(txt) {
	var x = document.getElementById("snackbar");
	x.innerHTML=txt;
	x.className = "show";
	setTimeout(function(){
		x.className = x.className.replace("show", "");
	}, 3000);
}