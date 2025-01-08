// Initialize variables
const postInput = document.getElementById('new-post');
const addPostBtn = document.getElementById('add-post');
const postsContainer = document.getElementById('posts-container');
const currentDateElement = document.getElementById('current-date');

// Date formatting
const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};

// Set current date
function setCurrentDate() {
    const now = new Date();
    currentDateElement.textContent = now.toLocaleDateString('tr-TR', options);
}

// Load posts from local storage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-date">${post.date}</div>
            <div class="post-content">${post.content}</div>
        `;
        postsContainer.prepend(postElement);
    });
}

// Save post to local storage
function savePost(content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        date: new Date().toLocaleDateString('tr-TR', options),
        content: content
    };
    
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

// Add post event listener
addPostBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    
    if (content) {
        savePost(content);
        postInput.value = '';
    } else {
        alert('Lütfen bir günlük girişi yazın!');
    }
});

// Initialize app
function init() {
    setCurrentDate();
    loadPosts();
}

// Run initialization
init();
