vanilla.forum = {
    onload: async function() {
        let posts = await vanilla.curl('forum', 'GET', null);
        posts = JSON.parse(posts);
        vanilla.body.innerHTML = `<div class="table" id="forumPosts">
            <div class="tr">
                <div class="td">Title</div>
                <div class="td">Author</div>
                <div class="td">Message</div>
                <div class="td">Date</div>
            </div>
        </div>
        <button id="deletePosts">Delete All Posts</button>
        <hr/>
        <div class="form">
            <input type="text" id="title" placeholder="title"
            onkeyup="vanilla.limitInput(this, /[^a-zA-Z0-9 ]/g);"/>
            <input type="text" id="author" placeholder="author *"
            onkeyup="vanilla.limitInput(this, 'alphanumeric');"/>
            <br/><textarea id="post" placeholder="new post *"
            onkeyup="vanilla.limitInput(this, /[^a-zA-Z0-9 ]/g);"></textarea>
            <button id="newPost">New Post</button>
        </div>
        `;
        if (document.querySelector("#forumPosts")) {
            for(let i = 0; i < posts.length; i++) {
                vanilla.forum.appendPost(posts[i]);
            }
        }
        if (document.querySelector('#newPost')) {
            document.querySelector('#newPost').onclick = async function() {
                let post = {
                    title: document.querySelector('#title').value,
                    author: document.querySelector('#author').value,
                    post: document.querySelector('#post').value,
                    timestamp: (new Date()).toISOString()
                };
                let confirm = await vanilla.curl('forum/post', 'POST', post);
                if (confirm == 'Post created') {
                    vanilla.forum.appendPost(post);
                } else {
                    vanilla.flashMessage(confirm);
                }
            }
        }
        if (document.querySelector("#deletePosts")) {
            document.querySelector("#deletePosts").onclick = async function() {
                let confirm = await vanilla.curl('forum/post', 'DELETE', null);
                if (confirm == 'Posts deleted') {
                    document.querySelector("#forumPosts").innerHTML = `<div class="tr">
                        <div class="td">Title</div>
                        <div class="td">Author</div>
                        <div class="td">Message</div>
                        <div class="td">Date</div>
                    </div>`;
                } else {
                    vanilla.flashMessage(confirm);
                }
            }
        }
    },
    appendPost: function(post) {
        let title = vanilla.createDiv(false, 'td', post.title);
        title.setAttribute('postId', post.post_id);
        let author = vanilla.createDiv(false, 'td', post.author);
        let message = vanilla.createDiv(false, 'td', post.post);
        let timestamp = vanilla.createDiv(false, 'td', post.timestamp);
        let row = vanilla.createRow([title, author, message, timestamp]);
        if (post.verified == 1) {
            row.classList.add("verified");
        }
        document.querySelector("#forumPosts").append(row);
    },
}
