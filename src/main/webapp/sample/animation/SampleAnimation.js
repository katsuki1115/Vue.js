Vue.createApp({
	data: () => {
		return {
			isShow: false,
		}
	},
	methods: {
		beforeEnter: el => {
			//要素が出現・表示される前の状態をここで定義する
		},

		enter: (el, done) => {
			//elに出現・表示されるアニメーションを実行します
			//アニメーションが完了したら done コールバックを呼び出します
		},

		afterEnter: el => {
			//要素が出現・表示された後の状態をここで定義する
		},

		enterCancelled: el => {
			//要素が出現・表示するアニメーションをキャンセルされた時の状態をここで定義する
		},

		beforeLeave: el => {
			//要素が消滅・非表示される前の状態をここで定義する
		},

		leave: (el, done) => {
			//elに消滅・非表示されるアニメーションを実行します
			//アニメーションが完了したら done コールバックを呼び出します
		},
		
		afterLeave: el => {
			//要素が消滅・非表示するアニメーションをキャンセルされたときの状態を定義します
		},
		
		LeaveCancelled: el => {
			//要素が消滅・非表示するアニメーションをキャンセルされたときの状態を定義します
		},

	},
}).mount("#app")