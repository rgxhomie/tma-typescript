interface ApiResponse<T> {
    isSuccess: boolean,
    data?: T[],
    error?: string
};

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

async function fetchPosts(): Promise<ApiResponse<Post>> {
    const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';

    try{
        const response = await fetch(postsEndpoint);

        const posts =  await response.json() as Array<Post>;

        return {
            isSuccess: true,
            data: posts
        }
    }
    catch(e) {
        let msg: string | undefined = undefined;

        if (typeof e === 'string') msg = e;
        else if (e instanceof Error) msg = e.message;

        return {
            isSuccess: false,
            error: msg
        }
    }
}

function renderPosts(posts: Post[]): void {
    const container = document.getElementById('container');

    posts.forEach((post: Post) => {
        const postContainer = document.createElement('div');

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;
        postContainer.appendChild(postTitle);

        const postBody = document.createElement('p');
        postBody.textContent = post.body;
        postContainer.appendChild(postBody);

        container?.appendChild(postContainer);
    });
}

function renderError(error: Error): void {
    const container = document.getElementById('container');

    const errorTitle = document.createElement('h3');
    errorTitle.textContent = 'Error occured';
    container?.appendChild(errorTitle);

    if (error.message) {
        const errorBody = document.createElement('p');
        errorBody.textContent = error.message;
        container?.appendChild(errorBody);
    }
} 

fetchPosts()
.then(response => {
    if (response.isSuccess && response.data) renderPosts(response.data); 
    else throw new Error(response.error || 'Error while fetching data');
})
.catch(e => renderError(e));