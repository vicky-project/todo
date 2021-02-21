const AppTemplate = `
	<div id="app">
		<div class="container mt-4">
			<section v-show="notif">
				<div class="toast-wrapper">
			    <div class="toast">
			      You must enter a value for the todo
			    </div>
			  </div>
			</section>
			<h1 class="text-center pb-1">Todo App</h1>
			<section>
				<div class="row">
					<div class="col-md-4">
						<div class="card">
							<div class="card-header">Form Todo</div>
							<div class="card-body">
								<div class="mb-3">
	                <label for="" class="form-label">Title</label>
	                <input type="text" v-model="formdata.title" class="form-control" />
	              </div>
	              <div class="mb-3">
	                <label for="" class="form-label">Description</label>
	                <textarea v-model="formdata.description" class="form-control" rows="5"></textarea>
	              </div>
	              <hr>
	              <div class="d-flex flex-wrap justify-content-between mb-3">
		              <div v-show="!isEdit">
		              	<button class="btn btn-success" @click="insertTodo()">Save</button>
		              </div>
		              <div v-show="isEdit">
		              	<button class="btn btn-success" @click="updateTodo()">Update</button>
		              </div>
		              <button class="btn btn-secondary float-right" @click="resetForm()">Cancel</button>
	              </div>
							</div>
						</div>
					</div>
					<div class="col-md-8">
						<div class="row">
							<div class="col">
								<div class="card">
									<div class="card-header">Todo List</div>
									<div class="card-body">
										<div class="overflow-auto">
											<p v-show="todos.length <= 0" class="lead text-center text-primary p-5">No data available ...</p>
											<fieldset v-for="td in todos" v-bind:key="td.id">
												<legend>{{td.title}}</legend>
												<p>{{td.description}}</p>
												<div class="row">
													<div class="col-md-8">
														<p class="text-muted"><small>Created at: {{td.created_at}}</small><br><small>Updated at: {{td.updated_at}}</small></p>
													</div>
													<div class="col-md-4">
														<button class="btn btn-sm btn-danger float-right mx-2" @click="deleteTodo(td.id)">Delete</button>
														<button class="btn btn-sm btn-success float-right" @click="updateTodo(td.id)">Update</button>
													</div>
												</div>
												<hr class="pt-0 mt-0">
											</fieldset>
										</div>
									</div>
								</card>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>`

export default {
	name: 'App',
	data() {
		return {
			todos: [],
			isEdit: false,
			notif: false,
			formdata: {
				title: '',
				description: ''
			}
		}
	},
	methods: {
		resetForm() {
			this.formdata.title = ''
			this.formdata.description = ''
			this.isEdit = false
		},
		fetchTodo() {
			fetch('/api/read').then(res=>res.json()).then(data=>this.todos = data)
		},
		insertTodo() {
			if(this.formdata.title == '') {
				alert('Title must be not empty!')
				return
			}
			fetch('/api/create', {
				method: 'POST',
				headers:{'content-type': 'application/json'},
				body: JSON.stringify(this.formdata)
			}).then(res=>res.json()).then(data=>{
				this.resetForm()
				this.todos = data
			})
		},
		updateTodo(id) {
			if(!id) {
				if(this.formdata.title == '') {
					alert('Title must be not empty!')
					return
				}
				fetch(`/api/update/${this.isEdit}`, {
					method: 'POST',
					headers: {'content-type': 'application/json'},
					body: JSON.stringify(this.formdata)
				}).then(res=>res.json()).then(data=>{
					this.resetForm()
					this.fetchTodo()
				})
			} else {
				this.todos.map(td=>{
				if(td.id===id) {
					this.formdata.title = td.title
					this.formdata.description = td.description
					this.isEdit = td.id
				}
			})
			}
		},
		deleteTodo(id) {
			if(!confirm("Are you sure want to delete this item ?")) return
			fetch(`/api/delete/${id}`).then(res=>res.json()).then(res=>this.todos = this.todos.filter(todo=>todo.id!==id))
		}
	},
	mounted(){this.fetchTodo()},
	template: AppTemplate
}