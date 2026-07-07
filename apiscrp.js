document.getElementById("fetch-button").addEventListener("click", fetchrandomuser);

function fetchrandomuser()
{
    fetch("https://randomuser.me/api")
    //data comes in stream, thus have to cconvert in object of array type and must be displayed line by line
    .then(response => response.json())
    .then(data =>{
        let user= data.results[0];
        document.getElementById("user-img").src=user.picture.large;
        document.getElementById("user-name").textContent = `${user.name.first} ${user.name.last}`;
        document.getElementById("user-email").textContent= user.email;
    })

    //to handle error
    .catch(error => {
        console.error("error fetching user:", error);
        alert("failed to load user data.Try Again!");
    })
}