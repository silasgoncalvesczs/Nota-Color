document.addEventListener('DOMContentLoaded', () => {
    updatePosts();
})

function updatePosts() {
    fetch("http://192.168.10.191:3000/api/all").then(res => {
        return res.json();
    }).then(json => {
        let postElements = '';

        let posts = JSON.parse(json);

        posts.forEach((post) => {
            let postElement = `<div id="${post.id}" class="card ${post.corCard} m-1">
            <div class="card-header">
                <h5 class="card-title text-dark fw-bold">${post.title}</h5>
            </div>
            <div class="card-body">
                <div class="card-text">${post.description}</div>
                <div class="text-end text-light lh-1"><sub>Id. ${post.id}</sub></div>
            </div>
        </div>`
            postElements += postElement;
        })
        document.getElementById("posts").innerHTML = postElements;
    })
}

function newPost() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;
    let corrCard = document.getElementById("NameCores").value;

    let post = { title, description, corrCard };

    const options = {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(post)
    }
    fetch("http://192.168.10.191:3000/api/new", options).then(res => {
        console.log(res);
        updatePosts();
        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("NameCores").value = "";
    })
}

function deleteId() {
    let id = document.getElementById("descId").value;
    if (id == ""){
        console.log("id vazio");
    }
    else{
        console.log(id);
        const options = {
            method: "DELETE",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(id)
        }
        fetch(`http://192.168.10.191:3000/api/delete/${id}`, options).then(res => {
            console.log(res);
            updatePosts();
            document.getElementById("descId").value = "";
        })
    }
}

function autoRefresh() {
    window.location = window.location.href;
}
setInterval('autoRefresh()', 300000);