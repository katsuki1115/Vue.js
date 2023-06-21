Vue.createApp({
	data: function() {
		return {
			message: '',
			todoCategory: false,
			author: '',
			todoTitle: '',
			todoCategories: [],
			count: 0,
		}
	},
	methods: {
		onClickCountUp: function(event) {
			console.log(event)
			this.count += 1
		},
	},
}).mount('#app')
