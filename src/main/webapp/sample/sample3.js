Vue.createApp({
	data: function() {
		return {
			todoTitle: '',
		}
	},
	computed: {
		todoTitleText: function() {
			return 'todoTitleは、' + this.todoTitle + 'です。'
		},
	},
	watch: {
		todoTitleText: function(next, prev) {
			console.log('next: ' + next)
			console.log('prev: ' + prev)
		},
	},
}).mount('#app')
