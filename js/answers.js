// import questions from "./questions";
// import question from "./questions";
// const apiUrl = 'http://localhost:5000/api/v1';
// const answerurl = `${apiUrl}/${question.question_id}/answers`;
// const qanswersurl = `${apiUrl}/question_answers/${question.question_id}`;

// const answers = {
//     createAnswer: (answerurl,data) => {
//       const {answer_desc} = data;
//       fetch(answerurl, {
//         method: 'POST',
//         headers: {Authorization : localStorage.getItem('token')},
//         body: {answer_desc}
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//       })
//       .catch(err => {
//         console.log(`Fetch error ${err}`)
//       }
//       );
// },

//     showAnswers: (url) => {
//       fetch(qanswersurl, {
//         method: 'GET',
//         headers: {Authorization: localStorage.getItem('token')}
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//       }
//       )
//       .catch(err => {
//         console.log(`Fetch error ${err}`)
//       });

//     } 
//  };

//  function answer(){
//   answer_desc = document.getElementById('answer').value;
//   answers.createAnswer(answerurl, answer_desc)

//  }
