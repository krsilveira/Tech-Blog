// update Blog entry
const updateBlog = async (event) => {
  event.preventDefault();

  console.log("clicked update");


  // const button = document.querySelector('#delete-btn')
  const id = event.target.getAttribute('update-id');
  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (id && title && description) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  } else {
    console.log(`id is ${id}\ntitle is ${title}\ndescription is ${description}`);
  }
};


document
  .querySelector('.update-blog-form')
  .addEventListener('submit', updateBlog);

