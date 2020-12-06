const questionSentence = document.getElementById("questionSentence");
const choiceBox = document.getElementById("choiceBox");
const choice = document.getElementsByClassName("choice");
const restartBtn = document.getElementById("restartBtn");

// 問題一覧
const questions = [
  {
    question: "織田信長が今川義元に勝利した合戦とは？",
    answer: ["長篠の戦い", "桶狭間の戦い", "川中島の戦い"],
    correctAnswer: "桶狭間の戦い"
  },
  {
    question: "織田信長が布教を許した宗教とは？",
    answer: ["キリスト教", "ヒンドゥー教", "イスラム教"],
    correctAnswer: "キリスト教"
  },
  {
    question: "織田信長が明智光秀によって暗殺された場所は？",
    answer: ["延暦寺", "本能寺", "阿弥陀寺"],
    correctAnswer: "本能寺"
  }
];

let index = 0;
let questionCount = questions.length;
let correctCount = 0;

// 問題のシャッフル
const shuffle = (array) => {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 問題文と選択肢の生成
const buildQuestion = () => {
  // 選択肢のシャッフル
  shuffle(questions[index].answer);
  // 質問文の表示
  questionSentence.innerText = questions[index].question;
  // 選択肢の表示
  for (let i = 0; i < questions[index].answer.length; i++) {
    const answerBtn = document.createElement("button");
    answerBtn.classList.add("choice");
    answerBtn.value = questions[index].answer[i];
    answerBtn.innerText = questions[index].answer[i];
    answerBtn.onclick = () => {
      checkCorrect(answerBtn);
      index++;
      if(index <= questions.length - 1) {
        buildQuestion();
      }
      else {
        result();
        questionSentence.innerText = "";
        restartBtn.style.display = "block";
      }
    };
    choiceBox.appendChild(answerBtn);
  }
}

// 正解の判定
const checkCorrect = (answerBtn) => {
  if(answerBtn.value === questions[index].correctAnswer) {
    alert("正解です!!");
    removeQuestion();
    correctCount++;
  } else {
    alert("不正解です\n正解は「" + questions[index].correctAnswer + "」です");
    removeQuestion();
  }
}

// 選択肢の削除
const removeQuestion = () => {
  for (let i = 0; i < questions[index].answer.length; i++) {
    choiceBox.removeChild(document.querySelector("button"));
  }
}

// 結果発表
const result = () => {
  alert("お疲れ様でした！\n正解数：" + correctCount + "\n正解率：" + correctCount +"/"+ questionCount);
}

// クイズのリセット
const reset = () => {
  restartBtn.style.display = "none";
  index = 0;
  questionCount = questions.length;
  correctCount = 0;
  shuffle(questions);
  buildQuestion();
}

restartBtn.addEventListener("click", () => {
  reset();
});
shuffle(questions);
buildQuestion();
