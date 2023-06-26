Vue.createApp({
	data: function() {
		return {
			// 商品一覧
			items: [],
			activeTab: 1, // アクティブなタブ
			// 絞り込みテキスト
			filterText: "",
			prices: [
				{
					id: 1,
					text: "～100円"
				},
				{
					id: 2,
					text: "101円～500円"
				},
				{
					id: 3,
					text: "501円～"
				}
			],
			// 絞り込み価格ID
			filterPriceId: undefined
		}
	},
	computed: {
		// 商品名で絞り込むタブがアクティブ
		acitiveWordsTab: function() {
			return this.activeTab === 1
		},
		// 価格で絞り込むタブがアクティブ
		acitivePriceTab: function() {
			return this.activeTab === 2
		},
		// 商品名で絞り込み込みした商品一覧
		filteredItemsByText: function() {
			const self = this
			if (this.filterText) {
				return this.items.filter(function(item) {
					return item.name.indexOf(self.filterText.trim()) !== -1
				})
			} else {
				return this.items
			}
		},
		// 価格で絞り込み込みした商品一覧
		filteredItemsByPriceId: function() {
			const self = this
			if (this.filterPriceId) {
				return this.items.filter(function(item) {
					switch (self.filterPriceId) {
						case 1:
							return item.price <= 100
						case 2:
							return item.price > 100 && item.price <= 500
						case 3:
							return item.price > 500
						default:
							return item.price >= 0
					}
				})
			} else {
				return this.items
			}
		},
		// アクティブなタブの状態を判別して商品一覧を出し分ける
		filteredItems: function() {
			if (this.acitiveWordsTab) {
				return this.filteredItemsByText
			} else if (this.acitivePriceTab) {
				return this.filteredItemsByPriceId
			} else {
				return this.items
			}
		}
	},
	methods: {
		// 商品一覧をjsonから取得する
		fetchItem: function() {
			const self = this
			axios.get("./item.json").then(function(response) {
				self.items = response.data
			})
		},
		// タブを切り替えて検索条件を初期化する
		changeTab: function(number) {
			this.initialize()
			this.activeTab = number
		},
		// 検索条件を初期化する
		initialize: function() {
			this.filterText = ""
			this.filterPriceId = undefined
		}
	},
	mounted: function() {
		// アプリケーションが立ち上がったら商品一覧を取得する
		this.fetchItem()
	}
}).mount("#app")