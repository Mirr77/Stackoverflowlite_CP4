const apiUrl = 'http://localhost:5000/api/v1';
const questionsurl = `${apiUrl}/questions`;
const myquestionsurl = `${apiUrl}/user_questions`;


const questions = {

    getAll: (url) => {
              fetch(questionsurl, {
                  method: 'GET',
                  headers: {"Authorization":localStorage.getItem('token') }
                    })
              .then(response => response.json())
              .then(data => {
                  if(data.message == 'Account logged out. Please log in to continue'){
                    window.location.href = "index.html";
                  }
                  else if(data.message == 'Your token has expired. Please log in to continue' ){
                    window.location.href = "index.html";
                  }
                    // Call function to map items to a html element
                  console.log('REs-data:', data);
                    
                  mapelements.mapAllQuestions(data.questions);
                    })
              .catch(err => {
                console.log(`Fetch Error: ${err}`);
                  });
            },

    myQuestions: (url) => {
                  fetch(myquestionsurl, {
                    method: 'GET',
                    headers: {"Authorization": localStorage.getItem('token') }
                      })

                  .then(response => response.json())
                  .then(data => {
                    if(data.message == 'Account logged out. Please log in to continue'){
                      window.location.href = "index.html";
                    }
                    else if(data.message == 'Your token has expired. Please log in to continue' ){
                      window.location.href = "index.html";
                    }
                    console.log('REs-data:', data);
                    mapelements.mapMyQuestions(data.questions);
                    })
                  .catch(err => {
                    console.log(`Fetch Error: ${err}`);
                    });
                }
};

window.onload = () => {questions.getAll(questionsurl);
                      questions.myQuestions(myquestionsurl);
                      getdata(profileUrl);
                    }

const answers = { 

    questionanswers: $(document).on('click', '.card.questions', 
                      function getquestionAnswers (url){
                      $('.answers-container').empty();

                      let id = $(this).attr('id')
                      $('.answer-button').attr('id',id);
                        
                      fetch(`${apiUrl}/question_answers/${id}`, {
                          method: 'GET',
                          headers: {"Authorization": localStorage.getItem('token')}
                          })
                      .then((response) => response.json())
                      .then(data => {
                        if(data.message == 'Your token has expired. Please log in to continue' ){
                          window.location.href = "index.html";
                        }
                          console.log(data);
                          mapelements.mapAnswers(data.answers);
                          })
                      .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                          });
                      }),

    answerquestion: $(document).on('click', '.answer-button', 
                      function createAnswer(url) {
                      let id = $(this).attr('id')
                      let answer = document.getElementById('answer').value;

                      fetch(`${apiUrl}/questions/${id}/answers`, {
                          method:'POST',
                          headers:{"Authorization":localStorage.getItem('token'),
                                      "Content-type":"application/json" ,
                                      "Accept":"application/json"},
                          body: JSON.stringify({
                              "answer":answer
                            })
                        })
                      .then((response) => response.json())
                      .then(data => {
                          if(data.message == 'Your token has expired. Please log in to continue' ){
                            window.location.href = "index.html";
                          }
                          console.log(data.answers);
                          window.location= "questions.html";
                          })
                      .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                          });
                      })
};

const Delete= {
  
    questionpopup: $(document).on('click', '.button.delete.question', 

                    function showpopup(){
                    let id = $(this).attr('id')
                    $('.delete-button').attr('id',id);

                    $(".cover").fadeIn('slow');
                    $(".popup").fadeIn('slow');
                    }  
                    ),

    deletequestion: $(document).on('click', '.delete-button',
                    function deleteQuestion(url){
                    let id = $(this).attr('id')

                    fetch(`${apiUrl}/questions/${id}`, {
                        method: 'DELETE',
                        headers: {"Authorization":localStorage.getItem('token') }
                    })
                    .then((response) => response.json())
                    .then(data => {
                        if(data.message == 'Your token has expired. Please log in to continue' ){
                          window.location.href = "index.html";
                        }
                        else if(data.message == "Deleted successfully"){
                            document.getElementById('delete-message').innerHTML=data.message;
                            window.location.href = "myaccount.html";
                              }
                        console.log(data.message);
                        })
                    .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                      });
                      }),

    answerpopup: $(document).on('click', '.button.delete.answer', 

                  function showpopup(url){
                  let id = $(this).attr('id')
                  let name = $(this).attr('name')
      
                  $('.delete-button').attr('id',id);
                  $('.delete-button').attr('name',name);
                      
                  $(".cover").fadeIn('slow');
                  $(".popup").fadeIn('slow');
                  }  
                  ), 

    deleteanswer: $(document).on('click', '.delete-button', 
                    function deleteAnswer (url){
      
                    let question_id = $(this).attr('name')
                    let answer_id = $(this).attr('id')
      
                    fetch(`${apiUrl}/questions/${question_id}/answers/${answer_id}`, {
                        method: 'DELETE',
                        headers: {"Authorization":localStorage.getItem('token') }
                        })
                    .then((response) => response.json())
                    .then(data => {
                        if(data.message == 'Your token has expired. Please log in to continue' ){
                          window.location.href = "index.html";
                        }
                        else if(data.message == "successfully deleted the answer"){
                            window.location.reload();
                            }
                            console.log(data.message);
                          })
                    .catch(err => {
                        console.log(`Fetch Error: ${err}`);
                        });
                    })
  };


const edit = {

    editquestionpopup: $(document).on('click', '.button.edit.question', 

                        function showpopup(url){
                        let id = $(this).attr('id')
                        let description = $(this).attr('description')

                        $('.edit-button').attr('id',id);
                        $('.description').html(description);
                            
                        $(".cover").fadeIn('slow');
                        $(".container.edit").fadeIn('slow');
                        }  
                        ), 
    
    editquestion: $(document).on('click', '.edit-button', 
                  function editQuestion(url){
                  
                  let id = $(this).attr('id')
                  let description = document.getElementById('description').value;

                  fetch(`${apiUrl}/questions/${id}`, {
                      method: 'PUT',
                      headers: {"Authorization":localStorage.getItem('token') },
                      body: JSON.stringify({
                        "description":description})
                      })
                  .then((response) => response.json())
                  .then(data => {
                      if(data.message == "Successfully updated the question"){
                          window.location.reload();
                      }
                      console.log(data.message);
                      })
                  .catch(err => {
                      console.log(`Fetch Error: ${err}`);
                      });
                  }),

    editanswerpopup: $(document).on('click', '.button.edit.answer', 
                      function showpopup(url){
                      let id = $(this).attr('id')
                      let name = $(this).attr('name')
                      let description = $(this).attr('description')
          
                      $('.edit-button').attr('id',id);
                      $('.edit-button').attr('name', name);
                      $('.description').html(description);
                          
                      $(".cover").fadeIn('slow');
                      $(".container.edit").fadeIn('slow');
                      }  
                      ), 
      
    
    editanswer: $(document).on('click', '.edit-button', 
                function editAnswer(url){
                let question_id = $(this).attr('name')
                let answer_id = $(this).attr('id')
                  
                let answer = document.getElementById('description').value;

                fetch(`${apiUrl}/questions/${question_id}/answers/${answer_id}`, {
                      method: 'PUT',
                      headers: {"Authorization":localStorage.getItem('token') },
                      body: JSON.stringify({
                        "answer":answer})
                      })
                .then((response) => response.json())
                .then(data => {
                      console.log(data.message);
                      window.location.reload();
                      })
                .catch(err => {
                      console.log(`Fetch Error: ${err}`);
                      });
                  })
  };


const answerFunctions = {

    vote: $(document).on('click', '.vote', 
            function upvoteAnswer(url){
            let answer_id = $(this).attr('id')
            let vote = $(this).attr('vote')

            fetch(`${apiUrl}/answers/${answer_id}/vote`, {
                method: 'POST',
                headers: {"Authorization":localStorage.getItem('token') },
                body: JSON.stringify({
                      "vote":vote})
                    })
                .then((response) => response.json())
                .then(data => {
                      console.log(data.message);
                    })
                .catch(err => {
                      console.log(`Fetch Error: ${err}`);
                    });
                }),

    accept: $(document).on('click', '.accpet', 
              function acceptAnswer(url){
              let answer_id = $(this).attr('id')
              let question_id= $(this).attr('name')

              fetch(`${apiUrl}question/${question_id}/answers/${answer_id}/accept`, {
                  method: 'POST',
                  headers: {"Authorization":localStorage.getItem('token') },
                  body: JSON.stringify({
                        "vote":vote})
                    })
              .then((response) => response.json())
              .then(data => {
                  console.log(data.message);
                    })
              .catch(err => {
                  console.log(`Fetch Error: ${err}`);
                    });
                })
};



const mapelements = {

    mapAllQuestions: (data) => {
                    data.forEach(question => {
                      const element = `

                      <div class="card questions" id=${question.question_id}>
                            <p> ${question.question_description}? </p>
                                <h6>
                                    <p>Posted by: ${question.posted_by}</p>
                                    <a>Answers: ${question.answers.length}</a>
                                </h6>
                      </div>
                    `;
                      $('.questions-container').append(element);
                    });
                  },

    mapAnswers: (data) => {
                data.forEach(answer => {
                  let user_id = localStorage.getItem('user_id')
                  let quser_id = localStorage.getItem('quser_id') 

                  if((user_id == answer.user_id) || (user_id == quser_id)){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                            <p>Posted by: ${answer.posted_by}</p>
                          </h6>
                          <button class="button delete answer" id="${answer.answer_id}" name="${answer.question_id}">Delete</button>
                          <button class="button edit answer" id="${answer.answer_id}" name="${answer.question_id}" description="${answer.answer_description}">Edit</button>
                          <button class="button accept answer" id="${answer.answer_id}" name="${answer.question_id}">Accept</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);
                  }
                else if ((user_id != answer.user_id) || (user_id == quser_id)){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                            <p>Posted by: ${answer.posted_by}</p>
                          </h6>
                          <button class="button accept answer" id="${answer.answer_id}" name="${answer.question_id}">Accept</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);

                }
                else if (user_id === answer.user_id){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                            <p>Posted by: ${answer.posted_by}</p>
                          </h6>
                          <button class="button delete answer" id="${answer.answer_id}" name="${answer.question_id}">Delete</button>
                          <button class="button edit answer" id="${answer.answer_id}" name="${answer.question_id}" description="${answer.answer_description}">Edit</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);

                }
                else {
                  const element = `

                  <div class="card answer" id=${answer.answer_id}>
                      <div>
                        <img class="vote upvote" id=${answer.answer_id} vote="1" src="../images/upvote.png" alt="vote">
                        <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                        <img class="vote downvote" id=${answer.answer_id} vote="2" src="../images/upvote.png" alt="vote">
                      </div>

                      <div>
                            <p> 
                                ${answer.answer_description}
                            </p>
                            <h6>
                                <p>Posted by: ${answer.posted_by}</p>
                            </h6> 
                      </div>
                  </div>`;

                  $('.answers-container').append(element);
                } 

                });
              },

  mapMyQuestions: (data) => {
                  data.forEach(question => {
                    const element = `
                    <div class="card questions" id=${question.question_id}>
                        <p> ${question.question_description}? </p>
                          <h6>                         
                              <p>Posted by: you </p>
                              <a>Answers: ${question.answers.length}</a><br>
                              <button class="button delete question" id="${question.question_id}">Delete</button>
                              <button class="button edit question" id="${question.question_id}" description="${question.question_description}" >Edit</button>
                          </h6>
                    </div>
                  `;
                    $('.myquestions-container').append(element);
                  });
                }
};
  

createQuestion = document.getElementById('postquestion').addEventListener('click', async(event) => {
  event.preventDefault();
  let description = document.getElementById('description').value;
  fetch(questionsurl, {
    method:'POST',
    headers:{"Authorization":localStorage.getItem('token'),
              "Content-type":"application/json" ,
              "Accept":"application/json"},
    body: JSON.stringify({
      "description":description
    })
  })
    .then(response => response.json())
    .then(data => {
      window.localStorage.setItem('quser_id', data['question'][0]['user_id'])
      console.log(data);
    })
    .catch(err => {
      console.log(`Fetch Error: ${err}`);
    });
    })



                








