Vue.createApp({
	data: function() {
		return {
			// カルーセル画像の配列
			items: [
				{
					id: 1,
					src: "https://placehold.jp/300x300.png"
				},
				{
					id: 2,
					src: "https://placehold.jp/3d4070/ffffff/300x200.png"
				},
				{
					id: 3,
					src: "https://placehold.jp/b32020/ffffff/300x400.png"
				}
			],
			currentHeight: 0, // 現在表示しているカルーセル画像の高さ
			selectedIndex: 0, // 現在表示しているカルーセル画像のインデックス
			imageTransitionName: "prev" // トランジション名 prev OR next
		}
	},
	computed: {
		target: function() {
			const self = this
			return this.items[self.selectedIndex] // 現在表示しているカルーセル画像オブジェクト
		},
		lastIndex: function() {
			return this.items.length - 1 // 最後のカルーセル画像のインデックス
		}
	},
	methods: {
		// ドットをクリックしたときのメソッド
		onClickPager: function(index) {
			// 選択したドットのインデックスが選択していた画像のインデックスより
			// 前か後ろかでトランジション名を変更する
			this.imageTransitionName = this.selectedIndex < index ? "next" : "prev"
			this.selectedIndex = index
			// 選択中のインデックスに引数で受け取ったインデックスをセット
			this.setTargetHeight(index) //img要素の親に高さをセット
		},
		// PREVボタンををクリックしたときのメソッド
		onClickPrev: function() {
			this.imageTransitionName = "prev"
			// 最初の画像で「PREV」を押下した場合、最後の画像を表示する
			this.selectedIndex =
				this.selectedIndex <= 0 ? this.lastIndex : this.selectedIndex - 1
			this.setTargetHeight(this.selectedIndex)
		},
		// NEXTボタンををクリックしたときのメソッド
		onClickNext: function() {
			this.imageTransitionName = "next"
			// 最後の画像で「NEXT」を押下した場合、最初の画像を表示する
			this.selectedIndex =
				this.selectedIndex >= this.lastIndex ? 0 : this.selectedIndex + 1
			this.setTargetHeight(this.selectedIndex)
		},
		// 受け取ったインデックス番号の画像の高さを取得してimg要素の親に高さをセットするメソッド
		setTargetHeight: function(index) {
			const img = new Image()
			const self = this
			img.src = this.items[index].src
			img.onload = function(event) {
				// 画像が読み込まれたら画像の高さを親要素へセット
				self.currentHeight = event.currentTarget.height
			}
		}
	},
	mounted: function() {
		this.setTargetHeight(this.selectedIndex)
	}
}).mount("#app")