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
                  let user_id = localStorage.getItem('user_id')
                  fetch(`${apiUrl}/user_questions/${user_id}`, {
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
                    else if(data.message == "There are no questions to view"){
                      $('.myquestions-container').html(data.message);
                    }
                    else{
                      mapelements.mapMyQuestions(data.questions);
                    }
                    })
                  .catch(err => {
                    console.log(`Fetch Error: ${err}`);
                    });
                },

    createQuestion: async(url) => {
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
                        document.getElementById('message').innerHTML = data.message;
                        $('.message.questions').fadeIn('slow');
                        $('.message.questions').fadeOut(3000);

                      })
                    .catch(err => {
                        console.log(`Fetch Error: ${err}`);
                      });
                      }  

};


window.onload = () => {questions.getAll(questionsurl);
  questions.myQuestions(myquestionsurl);
  profile.getmydata(profileUrl); 
  postedbyprofile.profileQuestions(myquestionsurl);
}

const answers = { 

    questionanswers: (id) => {
                      $('.answers-container').empty();
                      document.getElementsByClassName("answer-button")[0].setAttribute("id", id);

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
                      },

    answerquestion: async (id) => {
                    event.preventDefault();

                      let answer = document.getElementById('answer-desc').value;

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
                          else if(data.message == 'Your token has expired. Please log in to continue' ){
                            document.getElementById("message-answers").innerHTML = data.message;
                          }
                          else{
                            console.log(data);
                            document.getElementById("message-answers").innerHTML = data.message;
                            $('.message.answers').fadeIn('slow');
                            $('.message.answers').fadeOut(3000);
                              }
                          })
                      .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                          });
                      }

};


const answerFunctions = {

  vote: (id, name) => {

          fetch(`${apiUrl}/answers/${id}/vote`, {
              method: 'POST',
              headers: {"Authorization":localStorage.getItem('token') },
              body: JSON.stringify({
                    "vote":name})
                  })
          .then((response) => response.json())
          .then(data => {
              console.log(data.message);
              document.getElementById("message-answers").innerHTML = data.message;
              $('.message.answers').fadeIn('slow');
              $('.message.answers').fadeOut(3000);
                })
          .catch(err => {
              console.log(`Fetch Error: ${err}`);
              });
              },

  accept: async(id,name) => {
            event.preventDefault();
            let answer_id = id
            let question_id= name 

            fetch(`${apiUrl}/questions/${question_id}/answers/${answer_id}/accept`, {
                method: 'POST',
                headers: {"Authorization":localStorage.getItem('token')},
                body: JSON.stringify({
                      "status":"accepted"})
                  })
            .then((response) => response.json())
            .then(data => {
                $(this).html('Accepted');
                document.getElementById("message-answers").innerHTML = data.message;
                $('.message.answers').fadeIn('slow');
                $('.message.answers').fadeOut(3000);
                  })
            .catch(err => {
                console.log(`Fetch Error: ${err}`);
                  });
              }
};


const postedbyprofile = {

click: (id) => {
          localStorage.setItem('profile_id', id)
          window.location.href  = "profile.html";
          },

profileQuestions: (url) => {
            let user_id = localStorage.getItem('profile_id')
            fetch(`${apiUrl}/user_questions/${user_id}`, {
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
              else if(data.message == "There are no questions to view"){
                $('.myquestions-container-other').html(data.message)
              }
              else{
                mapelements.mapProfileQuestions(data.questions);
              }
              })
            .catch(err => {
              console.log(`Fetch Error: ${err}`);
              });
          }

};

const Delete= {
  
    questionpopup: (id) => {
                    window.localStorage.setItem('deleteq_id', id)
                    $(".cover").fadeIn('slow');
                    $(".popup").fadeIn('slow');
                    },

    deletequestion: $(document).on('click', '.delete-button',
                    function deleteQuestion(url){
                    let id = localStorage.getItem('deleteq_id')

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
                            window.location.href = "myaccount.html";
                              }
                        console.log(data.message);
                        })
                    .catch(err => {
                          console.log(`Fetch Error: ${err}`);
                      });
                      }),

    answerpopup: (id, name)  => {
                  window.localStorage.setItem('deleteans_id', id)
                  window.localStorage.setItem('deleteans_name', name)


                  $(".cover").fadeIn('slow');
                  $(".popup").fadeIn('slow');
                  }, 

    deleteanswer: $(document).on('click', '.delete-button', 
                    function deleteAnswer (url){
      
                    let question_id = localStorage.getItem('deleteans_name')
                    let answer_id = localStorage.getItem('deleteans_id')
      
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
                            
                          })
                    .catch(err => {
                        console.log(`Fetch Error: ${err}`);
                        });
                    })
  };


const edit = {

    editquestionpopup: (id,value) => {
                      window.localStorage.setItem('editq_id', id)
                      document.getElementById("description").innerHTML = value;

                      $(".cover").fadeIn('slow');
                      $(".container.edit").fadeIn('slow');
                        },
    
    editquestion: $(document).on('click', '.edit-button', 
                  function editQuestion(url){
                  
                  let id = localStorage.getItem('editq_id');
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

    editanswerpopup: (id,name,value) => {
                    window.localStorage.setItem('editans_id', id)
                    window.localStorage.setItem('editans_name', name)
                    document.getElementById("description").innerHTML = value;
                          
                      $(".cover").fadeIn('slow');
                      $(".container.edit").fadeIn('slow');
                      },
    
    editanswer: $(document).on('click', '.edit-button', 
                function editAnswer(url){
                let question_id = localStorage.getItem('editans_name')
                let answer_id = localStorage.getItem('editans_id')
                  
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

const mapelements = {

    mapAllQuestions: (data) => {
                    data.forEach(question => {
                      const element = `

                      <div class="card questions" id=${question.question_id} onclick="answers.questionanswers(id)">
                            <p> ${question.question_description}? </p>
                                <h6>
                                <p>Posted by:<a class="posted" id=${question.user_id}  onclick="postedbyprofile.click(id)" style=color:blue;>${question.posted_by}</a> on: ${question.created_at}</p>
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
              
                  if((answer.question_owner == user_id) && (user_id == answer.user_id)){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} name="1" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} name="2" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                          <p>Posted by:<a class="posted" user_id=${answer.user_id} style=color:blue;>${answer.posted_by}</a> on ${answer.created_at}</p>
                          </h6>
                          <button class="button delete answer" id="${answer.answer_id}" name="${answer.question_id}" onclick="Delete.answerpopup(id,name)">Delete</button>
                          <button class="button edit answer" id="${answer.answer_id}" name="${answer.question_id}" value="${answer.answer_description}" onclick="edit.editanswerpopup(id,name,value)">Edit</button>
                          <button class="button accept answer" id="${answer.answer_id}" name="${answer.question_id}" onclick="answerFunctions.accept(id,name)">${answer.accepted}</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);
                  }
                else if ((answer.question_owner == user_id) && (user_id != answer.user_id)){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} name="1" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} name="2" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                          <p>Posted by:<a class="posted" user_id=${answer.user_id} style=color:blue;>${answer.posted_by}</a> on: ${answer.created_at}</p>
                          </h6>
                          <button class="button accept answer" id="${answer.answer_id}" name="${answer.question_id}" onclick="answerFunctions.accept(id,name)">${answer.accepted}</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);

                }
                else if (user_id == answer.user_id){

                  const element = `

                  <div class="card answer" id=${answer.answer_id}>

                        <div>
                          <img class="vote upvote" id=${answer.answer_id} name="1" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)"><br>
                          <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                          <img class="vote downvote" id=${answer.answer_id} name="2" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)">
                        </div>

                        <div>
                          <p> ${answer.answer_description}
                          </p>
                          <h6>
                          <p>Posted by:<a class="posted" style=color:blue;>${answer.posted_by}</a> on: ${answer.created_at}</p>
                          </h6>
                          <button class="button delete answer" id="${answer.answer_id}" name="${answer.question_id}" onclick="Delete.answerpopup(id,name)">Delete</button>
                          <button class="button edit answer" id="${answer.answer_id}" name="${answer.question_id}" value="${answer.answer_description}" onclick="edit.editanswerpopup(id,name,value)">Edit</button>
                        </div>
                  </div>`;

                  $('.answers-container').append(element);

                }
                else {
                  const element = `

                  <div class="card answer" id=${answer.answer_id}>
                      <div>
                        <img class="vote upvote" id=${answer.answer_id} name="1" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)">
                        <h2 style="text-align:center;color:grey;">${answer.votes}</h2>
                        <img class="vote downvote" id=${answer.answer_id} name="2" src="../images/upvote.png" alt="vote" onclick="answerFunctions.vote(id,name)">
                      </div>

                      <div>
                            <p> 
                                ${answer.answer_description}
                            </p>
                            <h6>
                                <p>Posted by:<a class="posted" user_id=${answer.user_id} style=color:blue;>${answer.posted_by}</a> on: ${answer.created_at}</p>
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
                    <div class="card questions" id=${question.question_id} onclick="answers.questionanswers(id)">
                        <p> ${question.question_description}? </p>
                          <h6>                         
                              <p>Posted by: YOU on: ${question.created_at}</p>
                              <a>Answers: ${question.answers.length}</a><br>
                              <button class="button delete question" id="${question.question_id}" onclick="Delete.questionpopup(id)">Delete</button>
                              <button class="button edit question" id="${question.question_id}" value="${question.question_description}" onclick="edit.editquestionpopup(id,value)">Edit</button>
                          </h6>
                    </div>
                  `;
                    $('.myquestions-container').append(element);
                  });
                },

  mapProfileQuestions: (data) => {
                  data.forEach(question => {
                    const element = `
                    <div class="card questions" id=${question.question_id}>
                        <p> ${question.question_description}? </p>
                          <h6>                         
                              <p>Posted by: YOU on: ${question.created_at}</p>
                              <a>Answers: ${question.answers.length}</a><br>
                          </h6>
                    </div>
                  `;
                    $('.myquestions-container-other').append(element);
                  });
                }
  
};
  





                








