<template>
  <div class="app">
    <div class="app-body">
      <b-container>
      <div class="result-div">
        
           <b-card
                border-variant="success"
                :header="exam.name"
                header-bg-variant="success"
                header-text-variant="white"
              >
                  <b-card-text>
                   <div class="resultInfo">     
                      <b-row >
                            <b-col cols="8">
                            Total Question:
                            </b-col>
                            <b-col>
                            {{ totalQun }}
                            </b-col>
                      </b-row>
                      <b-row >
                        <b-col cols="8">
                          Correct Answers:
                        </b-col>
                        <b-col>
                            {{ correctAnswer }}
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="8">
                      Incorrect Answers :
                        </b-col>
                        <b-col >
                          {{ wrongAnswer }}
                        </b-col>
                      </b-row>
                    
                      <b-row >
                        <b-col cols="8">
                            Not Answered :
                        </b-col>
                        <b-col >
                        {{ notAnswered }}
                        </b-col>
                      </b-row>
                      <b-row >
                        <b-col cols="8">
                          Not Attempted:
                        </b-col>
                        <b-col >
                        {{ notAttempted }}
                        </b-col>
                      </b-row>
                      <b-row >
                        <b-col cols="8">
                          Total Marks:
                        </b-col>
                        <b-col >
                          {{ (totalMarks - negativeMarks).toFixed(0) }}
                        </b-col>
                      </b-row>
                   </div>
                  </b-card-text>
             </b-card>

      </div>
        <b-row class="d-md-flex category-buttons">
          <b-col>
            <b-button
              class="btn-square w-100"
              variant="primary"
              @click="review('ALL')"
            >
              Review All Answers
            </b-button>
          </b-col>
          <b-col>
            <b-button
              class="btn-square w-100"
              variant="danger"
              @click="review('WRONG_ANSWER')"
            >
              Wrong Answers
            </b-button>
          </b-col>
          <b-col>
            <b-button
              class="btn-square w-100"
              variant="warning"
              @click="review('No Answer')"
            >
              Not Attempted
            </b-button>
          </b-col>
          <b-col>
            <b-button
              class="btn-square w-100"
              variant="success"
              @click="review('CORRECT_ANSWER')"
            >
              Correct Answers
            </b-button>
          </b-col>
        </b-row>

        <div v-for="(section, idx) in exam.sections" :key="idx">
          <b-row class="categorized-cards">
            <b-col lg="12">
              <b-card
                v-if="showReview"
                class="card-accent-info"
                role="tab"
                no-body
              >
                <div slot="header">
                  <b-link
                    v-b-toggle="'section-' + idx"
                    class="card-header-action btn-minimize"
                  >
                    <h5
                      class="float-left review-all-header"
                      style="color: #1a80be"
                    >
                      {{ getReviewTitle() }}
                    </h5>
                    <div class="card-header-actions">
                      <i class="icon-arrow-up"></i>
                    </div>
                  </b-link>
                </div>
                <b-collapse :id="'section-' + idx" visible>
                  <b-card-body>
                    <div
                      v-for="(question, index) in section.questions"
                      :key="index"
                    >
                      <div
                        v-show="
                          showAllAns ||
                          reviewValue == getReviewValue(index, question)
                        "
                        class="question-answer"
                      >
                        <div class="question p-2">
                          <span class="font-weight-bold">
                            {{ index + 1 }})&nbsp;&nbsp;
                          </span>
                          <span
                            class="font-weight-bold d-inline-block"
                            v-html="question.qun"
                          ></span>
                        </div>
                        <div class="answers1 p-2">
                          <div class="row">
                            <div class="col-sm-6">
                              <span >1.&nbsp;</span>
                              <span v-html="question.options.opt1"></span>
                            </div>
                            <div class="col-sm-6">
                              <span>2.&nbsp;</span>
                              <span v-html="question.options.opt2"></span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-sm-6">
                              <span>3.&nbsp;</span>
                              <span v-html="question.options.opt3"></span>
                            </div>
                            <div class="col-sm-6">
                              <span>4.&nbsp;</span>
                              <span v-html="question.options.opt4"></span>
                            </div>
                          </div>
                        </div>
                        <div class="results p-2">
                          <div class="mt-1">
                            <b-row>
                              <b-col lg="3">
                                <h6
                                  :id="'user-ans-' + (index + 1)"
                                  class="font-weight-bold"
                                >
                                  Your answer:
                                </h6>
                              </b-col>
                              <b-col lg="9">
                                <b-row
                                  v-if="
                                    userAns(index, question) ==
                                    correctAns(question)
                                  "
                                >
                                  <b-col lg="12">
                                    <h6 style="color: green">
                                      <span
                                        v-html="userAns(index, question)"
                                      ></span>
                                    </h6>
                                  </b-col>
                                  <b-col>
                                    <img
                                      src="~/assets/img/correct.png"
                                      height="25"
                                      width="25"
                                    />
                                  </b-col>
                                </b-row>

                                <b-row
                                  v-else-if="
                                    userAns(index, question) == 'No Answer'
                                  "
                                >
                                  <b-col>
                                    <h6 style="color: rgb(255, 170, 0)">
                                      <span
                                        v-html="userAns(index, question)"
                                      ></span>
                                    </h6>
                                  </b-col>
                                </b-row>

                                <b-row v-else>
                                  <b-col lg="12">
                                    <h6 style="color: red">
                                      <span
                                        v-html="userAns(index, question)"
                                      ></span>
                                    </h6>
                                  </b-col>
                                  <b-col>
                                    <img
                                      src="~/assets/img/wrong.png"
                                      height="25"
                                      width="25"
                                    />
                                  </b-col>
                                </b-row>
                              </b-col>
                            </b-row>

                            <b-row>
                              <b-col lg="3">
                                <h6 class="font-weight-bold">
                                  correct answer:
                                </h6>
                              </b-col>
                              <b-col lg="9">
                                <h6 v-html="correctAns(question)"></h6>
                              </b-col>
                            </b-row>

                            <b-row
                              v-if="
                                question.explanation &&
                                question.explanation.trim !== ''
                              "
                            >
                              <b-col cols="12" class="text-left">
                                <b-button
                                  class="btn-square"
                                  variant="primary"
                                  size="sm"
                                  @click="explation(index)"
                                >
                                  Explanation
                                </b-button>
                              </b-col>
                              <div
                                :id="'explation-div-' + (index + 1)"
                                class="col-sm-12 mt-2"
                                style="display: none"
                              >
                                <b-card>
                                  <p v-html="question.explanation.trim"></p>
                                </b-card>
                              </div>
                            </b-row>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamResult',
  auth: false,

  components: {},

  data() {
    return {
      showReview: true,
      correctAnswer: 0,
      wrongAnswer: 0,
      notAttempted: 0,
      notAnswered: 0,
      totalQun: 0,
      totalMarks: 0,
      negativeMarks: 0,
      exam: {},
      showAllAns: true,
      userId: 0,
      loaded: false,
      chartData: null,
      reviewValue: '',
      liveExamId: 0,
      liveExamObj: {}
    }
  },

  created() {
    if (process.browser) {
          this.createExamData()
          this.calculateResult()
          this.getUserAnalytics()
    }
  },
  methods: {

    createExamData() {
      this.ansArray = this.$auth.$storage.getUniversal('ANS_STR')
      this.exam = this.$auth.$storage.getUniversal('EXAM_DATA')
    },

    explation(index) {
      const id = 'explation-div-' + (index + 1)
      const x = document.getElementById(id)
      if (x.style.display == 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    },

    correctAns(question) {
      const correctAns = question.ans
      if (correctAns == 0) {
        return question.options.opt1
      } else if (correctAns == 1) {
        return question.options.opt2
      } else if (correctAns == 2) {
        return question.options.opt3
      } else {
        return question.options.opt4
      }
    },

    userAns(index, question) {
      const userAns = this.ansArray[index].ans
      if (userAns == 'opt1') {
        return question.options.opt1
      } else if (userAns == 'opt2') {
        return question.options.opt2
      } else if (userAns == 'opt3') {
        return question.options.opt3
      } else if (userAns == 'opt4') {
        return question.options.opt4
      } else {
        return 'No Answer'
      }
    },

    calculateResult() {
      let correctAnswer = 0
      let notAttempted = 0
      let notAnswered = 0
      this.totalQun = this.ansArray.length
      let ansIndx = 0
      let totalMarks = 0
      let wrongAnswer = 0
      let negativeMarks = 0
      for (let i = 0; i < this.exam.sections.length; i++) {
        const section = this.exam.sections[i]
        for (let j = 0; j < section.totalQuestion; j++) {
          const question = section.questions[j]
          
          const ansObj = this.ansArray[ansIndx]

          if (ansObj.status == 0) {
            notAttempted++
          } else if (ansObj.status == 1) {
            notAnswered++
          } else if (ansObj.status == 3) {
            if (ansObj.ans == this.getAns(question.ans)) {           
              correctAnswer++
              totalMarks = totalMarks + section.markPerQution
            } else {
              wrongAnswer++
            }
          }
          ansIndx++
        }
        negativeMarks = negativeMarks + section.negativeMarkPerQun * wrongAnswer
      }
      console.log(correctAnswer+" correctAnswer")
      this.correctAnswer = correctAnswer
      this.notAttempted = notAttempted
      this.notAnswered = notAnswered
      this.totalMarks = totalMarks.toFixed(2)

      this.wrongAnswer = wrongAnswer
      this.negativeMarks = negativeMarks.toFixed(2)
    },

    getAns(ansIndex) {
      if (ansIndex == 0) {
        return 'opt1'
      } else if (ansIndex == 1) {
        return 'opt2'
      } else if (ansIndex == 2) {
        return 'opt3'
      }
      if (ansIndex == 3) {
        return 'opt4'
      }
    },

    review(reviewValue) {
      if (reviewValue == 'ALL') {
        this.showAllAns = true
        this.reviewValue = 'ALL'
      } else {
        this.showAllAns = false
      }
      if (reviewValue == 'WRONG_ANSWER') {
        this.reviewValue = 'WRONG_ANSWER'
      } else if (reviewValue == 'No Answer') {
        this.reviewValue = 'No Answer'
      } else if (reviewValue == 'CORRECT_ANSWER') {
        this.reviewValue = 'CORRECT_ANSWER'
      }
    },

    getReviewValue(index, question) {
      const userAns = this.userAns(index, question)
      const correctAns = this.correctAns(question)

      if (userAns == correctAns) {
        return 'CORRECT_ANSWER'
      } else if (userAns == 'No Answer') {
        return 'No Answer'
      } else {
        return 'WRONG_ANSWER'
      }
    },

    getReviewTitle() {
      this.sectionScroll()
      if (this.reviewValue == 'WRONG_ANSWER') {
        return 'Displaying  Wrong Answer'
      } else if (this.reviewValue == 'No Answer') {
        return 'Not Answered And Not Attempted'
      } else if (this.reviewValue == 'CORRECT_ANSWER') {
        if (this.correctAnswer == 0) {
          return 'NO Correct Answer found !'
        } else {
          return 'Displaying  Correct Answer'
        }
      }
      return 'Displaying All Answer'
    },

    sectionScroll() {
      if (window.matchMedia('(max-width: 480px)').matches) {
        window.scrollTo(0, 200)
      } else {
        window.scrollTo(0, 200)
      }
    },

    getUserAnalytics() {
      this.loaded = false
      const graphData = {
        Correct: this.correctAnswer,
        'Not Answered': this.notAnswered,
        Incorrect: this.wrongAnswer,
        'Not Attempted': this.notAttempted
      }
      this.chartData = {
        labels: Object.keys(graphData), // ['Inactive User', 'Active User', 'Blacked User'],
        datasets: [
          {
            backgroundColor: ['#4dbd74', '#ece360', '#DD1B16', '#c9863e'],
            data: Object.values(graphData)
          }
        ]
      }
      this.loaded = true
    },
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.report-info > .row {
  padding: 10px 0;
}

.report-info > .row h6,
.report-info > .row h4 {
  padding: 0;
  margin: auto;
}

.report-info > .row.highlight:nth-child(even) {
  background: #fff;
}
.report-info > .row.highlight:nth-child(odd) {
  background: #fff;
}

.report-info > .row.highlight:hover {
  background: #ccc;
}

.reviw-all-header {
  margin: auto;
  top: 4px;
  position: relative;
}

.question-answer {
  margin: 2rem 1rem;
  padding: 1rem;
  border-style: groove;
}

.question {
  display: block;
}

.category-buttons {
  display: block;
}

.category-buttons .col {
  margin-bottom: 10px;
}

.resultsContainer {
  background: #007bff;
  margin-bottom: 1rem;
  margin-top: 1rem;
  flex-direction: column;

  .titleBox,
  .announcementBox {
    color: #fff;
    text-align: center;
  }

  .resultsBox {
    width: 33.333%;
    padding: 1rem;

    &:first-child {
      margin-left: 5%;
    }

    &:last-child {
      margin-right: 5%;
    }

    & > div {
      padding: 1rem;
      background: #fff;
      height: 100%;
      border-radius: 0.625rem;

      h3 {
        font-weight: bold;
      }
    }

    .detailsBox {
      display: inline-block;
      width: 100%;

      & > div {
        width: 50%;
        float: left;
      }
    }
  }
}
.result-div{
    margin-top: 2%;
    margin-bottom: 2%;
    font-weight: bold;
    border: solid;
    border-color: green;
    font-size: 100%;
   
  }
  .answers1 {
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem;
  margin-bottom: 0.625rem;
    list-style: none;
    list-style-position: inside;
}
.answers1 span {
  width: 100%;
   font-weight: bold;
   font-size: 115%;
}

.answers1 label {
  display: flex;
  align-items: center;
}
@media screen and (max-width: 480px) {
  .category-buttons {
    flex-wrap: wrap;
    flex-direction: column;
  }

  .categorized-cards .card-body {
    padding: 0;
  }

  .categorized-cards .card-body .question-answer {
    padding: 0;
    margin: auto;
  }

  .container {
    padding-right: 6px;
    padding-left: 6px;
  }

  .resultInfo{
    font-size:120%;

  }
}

@media only screen and (min-width: 640px) {
.result-div{
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 3%;
    margin-bottom: 3%;
    font-weight: bold;
    border: solid;
    border-color: green; 
    font-size: 17px; 
  }
.result-div .row:hover {
  background-color: #40c68e;
}
}
</style>
