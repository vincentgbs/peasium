vanilla.forum = {
    onload: async function() {
        let posts = await vanilla.curl('forum', 'GET', null);
        posts = JSON.parse(posts);
        vanilla.body.innerHTML = `<div class="table" id="forumPosts">
        <div class="tr">
            <div class="td">Title</div>
            <div class="td">Author</div>
            <div class="td">Date</div>
        </div></div><hr/>
        <div class="form">
            <input type="text" id="title" placeholder="title"/>
            <input type="text" id="author" placeholder="author *"/>
            <br/><textarea id="post" placeholder="new post *"></textarea>
            <button id="newPost">New Post</button>
        </div>
        `;
        if (document.querySelector("#forumPosts")) {
            for(let i = 0; i < posts.length; i++) {
                vanilla.forum.appendPost(posts[i]);
            }
        }
        if (document.querySelector('.forumPost')) {
            document.querySelector('.forumPost').onclick = async function(e) {
                console.debug(e.target.getAttribute('postId'));
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
                    vanilla.flashMessage('Error creating post');
                }
            }
        }
    },
    appendPost: function(post) {
        let row = document.createElement('div');
        row.setAttribute('class', 'tr');
        let title = document.createElement('div');
        title.setAttribute('class', 'td');
        title.setAttribute('postId', post.post_id);
        title.innerText = post.title;
        let author = document.createElement('div');
        author.setAttribute('class', 'td');
        author.innerText = post.author;
        let timestamp = document.createElement('div');
        timestamp.setAttribute('class', 'td');
        timestamp.innerText = post.timestamp;
        if (post.verified == 1) {
            row.classList.add("verified");
            author.classList.add("verified");
        }
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(timestamp);
        document.querySelector("#forumPosts").append(row);
    },
}
