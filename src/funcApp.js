
function createStudent(){
    var username =document.getElementById("username").value;
    var password =document.getElementById("password").value;
    var email =document.getElementById("email").value;
  
    var data = {"username":username, "email":email,"password":password};
    
    request = fetch('/students/add', {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
  
    }).then(response => response.text() )
    .then(response => {
        if (response === "SUCCESS"){
            alert(response)
            //fetchPlayers()
        }
        else{
            alert('Error')
            //fetchPlayers()
        }
    } )
  }
  