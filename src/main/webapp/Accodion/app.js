function nextFrame(cd) {
	window.requestAnimationFrame(function() {
		window.requestAnimationFrame(cd)
	})
}

const app = Vue.createApp({})

app.component('my-sample-accordion', {
	template: '#my-sample-accordion',
	props: {
		title: {
			type: String,
			required: true
		}
	},
	data: function() {
		return {
			isShown: false
		}
	},
	methods: {
		enter: function(el, done) {
			el.style.overflow = "hidden"
			const height = el.scrollHeight
			el.style.height = "0"
			
			nextFrame(function() {
				el.style.height = height + "px"
			})
		},
		leave: function(el) {
			el.style.overflow = "hidden"
			el.style.height = el.scrollHeight + "px"
			
			nextFrame(function() {
				el.style.height = "0"
			})
		},
		afterTransition: function(el) {
			el.style.overflow = ""
			el.style.height = ""
		}
	}
})
app.mount('#app')