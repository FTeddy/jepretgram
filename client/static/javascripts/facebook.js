// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    $('#login-process').text('Loggin you In...')
    setTimeout(function(){
      $('.fb-login-button').hide(500)
      $('.fb-logout-button').show(500).css('display', 'inline-block')
      // $('#proceed').show(500)
    }, 1000);

    const fbToken = response.authResponse.accessToken;
    testAPI(fbToken);


  } else {
    // The person is not logged into your app or we are unable to tell.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
    console.log('bad');
    $('.fb-login-button').show(500);
    $('.fb-logout-button').hide(500);
    // $('#proceed').hide(500);
    // $('#group-menu').hide();
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userID');
    // console.log(localStorage.token);
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
let localtest = '790273747826997'
let deploytest = '574430736255344'
window.fbAsyncInit = function() {
  FB.init({
    appId      : localtest,
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  FB.getLoginStatus(function(response) {
    var finished_rendering = function() {
      console.log("finished rendering plugins");
      var spinner = document.getElementById("spinner");
      $('#spinner').hide()
    }
    FB.Event.subscribe('xfbml.render', finished_rendering);
    statusChangeCallback(response);
  });



};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI(token) {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me',{ fields: ['id', 'name', 'email', 'gender', 'picture.width(150).height(150)'],
    access_token: token}, function(response) {
    console.log(response);
    console.log('Successful login for: ' + response.name);
    $('#login-process').text(`${response.name}`)

    // axios
    let localhost = 'http://localhost:3000';
    let deploy = 'https://blog-server.teddydevstack.com';
    axios.post(`${localhost}/fb/`, {response:response})
      .then((serverRes) => {
        console.log(serverRes)
        if (serverRes.data) {
          console.log('Successful data registration for: ' + serverRes.data.fbData.name);
          localStorage.setItem('jwtToken', serverRes.data.token);
          localStorage.setItem('userID', serverRes.data.userData._id);
        }
      })
      .catch((error) => {
        console.log(error);
      })

  });
}

// function login () {
//   FB.login((response)=>{
//     statusChangeCallback(response)
//   }, {scope:'public_profile,email'})
// }

function logout(){
  FB.logout((response)=>{
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userID');
    // localStorage.removeItem('userName');
    statusChangeCallback(response);
    location.reload();
  })
}
