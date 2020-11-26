vanilla.forum = {
    onload: async function() {
        let posts = await vanilla.curl('forum', 'GET', null);
        posts = JSON.parse(posts);
        for(let i = 0; i < posts.length; i++) {
            console.debug(posts[i]);
        }
    },
}
