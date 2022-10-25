const { post } = require("../routes/api");

module.exports = {
    posts: [],
    getAll() {
        return this.posts;
    },
    newPost(title, description, corCard) {
        this.posts.push({ id: generateID(), title, description, corCard });
    },
    deletePost(id) {
        //usa o filter para substituindo no array os posts anteriores
        console.log("Post", id, "Excluido");
        this.posts = this.posts.filter((post) => post.id != id);
    }
}

function generateID() {
    return Math.random().toString(36).substring(2, 9);
}