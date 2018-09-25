const apiUrl = 'http://localhost:5000/api/v1/auth';
const signupurl = `${apiUrl}/signup`;
const loginurl = `${apiUrl}/login`;


describe('testauth', (url) => {

    it('should register a user', async(event)=> {
      event.preventDefault();
      let username = 'Login';
      let email = 'logintest@gmail.com';
      let password = '1234';

      let configuration = { 
                            method: 'POST',
                            headers: {"Content-type":"application/json" ,
                                      "Accept":"application/json"},
                            body: JSON.stringify({
                              "username":username,
                              "email":email,
                              "password":password
                            }) };

      let response = fetch(loginurl,configuration);
      expect(response.status).toEqual(200);
    });

      it('should login a user', async (event) => {
          event.preventDefault();
          let email = 'logintest@gmail.com';
          let password = '1234';
          let configuration= {
            method: 'POST',
            headers: {
                    "Content-type":"application/json" ,
                    "Accept":"application/json"},
            body: JSON.stringify({
                "email":email,
                "password":password
              })
          };
          let response = fetch(loginurl, configuration);
          expect(response.status).toEqual(200);
      });

      it('logout function', async (event) => {
        event.preventDefault();
        let configuration = {
              method:'POST',
              headers:{"Authorization":localStorage.getItem('token')}
            }
        let response = fetch(logouturl, configuration);
        expect(response.status).toEqual(200);
      });
  });
  
  



