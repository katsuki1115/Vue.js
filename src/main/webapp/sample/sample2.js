Vue.createApp({
	data: function() {
		return {
			todoCategories: [],
		}
	},
	computed: {
		joinedToDoCategories: function() {
			return this.todoCategories.join(' / ')
		}, categoryText: function() {
			return '選択されているカテゴリー:' + this.joinedToDoCategories
		}, dateFormat: function() {
			const date = new Date()

			return date.getFullYear() + '/' + (date.getMonth() + 1)
		},
	},
}).mount('#app')
