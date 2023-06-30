// 定数
const ANSWER = { YES: 1, NO: 0 }
const CORRECT = { CD: 1, VALUE: "○" }
const INCORRECT = { CD: 0, VALUE: "×" }
const MAX_POINT = 100

const app = Vue.createApp({
	data: function() {
		return {
			questions: [
				{
					text: "大城侑也の好きな食べ物は梅である",
					answer: ANSWER.YES
				}
//				{
//					text:
//						"単一要素にトランジション効果を付与するのは aniamtion コンポーネントである",
//					answer: ANSWER.NO
//				},
//				{
//					text: "v-for の区切り文字として in の他に of を使用できる",
//					answer: ANSWER.YES
//				},
//				{
//					text:
//						"app.component で定義したコンポーネントを使う場合は、定義した後に Vue.createApp() の components オプション内で再度定義する必要がある",
//					answer: ANSWER.NO
//				},
//				{
//					text: "Vue.js をもっと書きたい",
//					answer: ANSWER.YES
//				}
			],
			currentIndex: 0,
			yourAnswers: []
		}
	},
	computed: {
		// 現在表示している問題文
		currentQuestion: function() {
			return this.questions[this.currentIndex]
		},
		// 正解した問題の配列
		correctAnswers: function() {
			const self = this
			return this.questions.filter(function(question, index) {
				return question.answer === self.yourAnswers[index]
			})
		},
		// 合計得点
		totalScore: function() {
			const score = MAX_POINT / this.questions.length // 1問あたりの点数
			return Math.floor(score * this.correctAnswers.length) // 小数点切り捨て
		}
	},
	methods: {
		// YES / NO ボタンがクリックされた際に発火するイベントハンドラー
		doAnsewer: function(answer) {
			this.yourAnswers[this.currentIndex] = answer
			this.nextQuestion()
		},
		// 次の問題へ進む
		nextQuestion: function() {
			if (this.currentIndex < this.questions.length) {
				this.currentIndex += 1
			}
		},
		// 最初から問題をやり直す
		doRestart: function() {
			this.currentIndex = 0
			this.initYourAnswersArray()
		},
		// 問題数から自分の解答を格納する配列の長さを設定する
		initYourAnswersArray: function() {
			this.yourAnswers = Array(this.questions.length)
		}
	},
	mounted: function() {
		this.initYourAnswersArray()
	}
})

// 問題表示＆解答コンポーネント
app.component("qa-template", {
	props: {
		// 問題文
		questionText: String
	},
	template: "#qa-template",
	methods: {
		onClickYesBtn: function() {
			// YESボタンをクリックし、YES用の値とイベントを親コンポーネントへ返す
			this.$emit("click-yes-btn", ANSWER.YES)
		},
		onClickNoBtn: function() {
			// NOボタンをクリックし、NO用の値とイベントを親コンポーネントへ返す
			this.$emit("click-no-btn", ANSWER.NO)
		}
	}
})

// 結果表示コンポーネント
app.component("result-template", {
	props: {
		// 合計得点
		totalScore: {
			type: Number,
			required: true
		},
		// 問題文配列
		questions: Array,
		// 自分の解答配列
		yourAnswers: Array
	},
	template: "#result-template",
	computed: {
		// 解答の正解不正解の配列
		corrects: function() {
			const self = this
			return this.questions.map(function(q, i) {
				if (q.answer === self.yourAnswers[i]) {
					return { cd: CORRECT.CD, value: CORRECT.VALUE }
				} else {
					return { cd: INCORRECT.CD, value: INCORRECT.VALUE }
				}
			})
		},
		// 最高得点
		maxPoint: function() {
			return MAX_POINT
		},
		// 満点を取れているかを真偽値で返す
		isPerfect: function() {
			return this.totalScore === this.maxPoint
		}
	},
	methods: {
		// 最初からやり直すボタンのクリックイベントを親コンポーネントへ返す
		onClick: function() {
			this.$emit("click")
		},
		// 問題の正解と自分の解答が一致した場合にclassを追加する
		getCorrectClassName: function(correctCd) {
			return correctCd === CORRECT.CD
				? "has-text-weight-bold has-text-white has-background-success"
				: ""
		}
	}
})

// アプリケーションを #app へマウント
app.mount("#app")
