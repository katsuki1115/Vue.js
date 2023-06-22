const todoItem = {
	template: '#template-todo-item',
	props: {
		todo: {
			type: Object,
			required: true,
		},
		done: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		hasCategories: function() {
			return this.todo.categories.length > 0
		},
	},
	methods: {
		onChangeTodo: function($event) {
			this.$emit('update:done', $event.target.checked)
		},
	},
}


Vue.createApp({
	componests: {
		'todo-item': todoItem,//↑todoItem関数
	},//コンポーネント
	data: function() {
		return {
			//インスタンス作成
			todoTitle: '',
			todoDescription: '',//初期状態を替えたい場合''に代入

			//チェックボックス
			todoCategories: [],
			hideDoneTodo: false,
			searchWord: '',

			//セレクトボックス
			selectedCategory: '',
			order: 'desc',

			categoryName: '',

			todos: [], //todoリストとカテゴリリストが入る
			categories: [],
		}
	},
	computed: {
		canCreateTodo: function() {//タイトルに名前が入っているかどうか
			return this.todoTitle !== ''
		},
		canCreateCategory: function() {
			return this.categoryName !== '' && !this.existsCategory
		},
		existsCategory: function() {
			const categoryName = this.categoryName
			return this.categories.indexOf(categoryName) !== -1
		},
		resultTodos: function() {
			const selectedCategory = this.selectedCategory//セレクトボックス
			const hideDoneTodo = this.hideDoneTodo //チェックボックス
			const order = this.order
			const searchWord = this.searchWord
			return this.todos
				.filter(function(todo) {
					retrun(
						selectedCategory === '' || todo.categories.indexOf(selectedCategory) !== -1
					)
				})
				.filter(function(todo) {
					if (hideDoneTodo) {
						return !todo.done
					}
					return true
				})
				.filter(function(todo) {
					return (
						todo.title.indexOf(searchWord) !== -1 || todo.description.indexOf(searchWord) !== -1
					)
				})
				.sort(function(a, b) {
					if (order === 'asc') {
						return a.dateTime - b.dateTime
					}
					return b.dateTime - a.dateTime
				})
		},
	},
	watch: {
		todos: {
			handler: function(next) {
				window.localStorage.setItem('todos', JSON.stringify(next))
			},
			deep: true,
		},
		categories: {
			handler: function(next) {
				window.localStorage.setItem('categories', JSON.stringify(next))
			},
			deep: true,
		},
	},
	methods: {
		createTodo: function() {
			if (!this.canCreateTodo) {
				return
			}
			this.todos.push({
				id: 'todo-' + ate.now(),
				title: this.todoTitle,
				description: this.todoDescription,
				categories: this.todoCategories,
				dateTime: Date.now(),
				done: false,
			})

			//ToDoタスクを追加する処理
			this.todoTitle = ''
			this.todoDescription = ''
			this.todoCategories = []
		},
		createCategory: function() {
			if (!this.canCreateCategory) {
				return
			}

			this.categories.push(this.categoryName)

			//カテゴリを追加する処理
			this.categoryName = ''
		},
	},
	created: function() {
		const todos = window.localStorage.getItem('todos')
		const categories = window.localStorage.getItem('categories')

		if (todos) {
			this.todos = JSON.parse(todos)
		}

		if (categories) {
			this.categories = JSON.parse(categories)
		}
	}
}).mount('#app')