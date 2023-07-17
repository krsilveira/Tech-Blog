
// function used to create comment
const newFormHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();
  const blog_id = event.target.getAttribute('data-num');
  console.log(event.target);

  // console.log("blog_id is", blog_id);

  if (text && blog_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, blog_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blog/${blog_id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

//entry handled from route call



// Delete blog entry

const deleteBlog = async (event) => {
  if (event.target.hasAttribute('delete-id')) {
    const id = event.target.getAttribute('delete-id');
    console.log(`going to delete ${id}`);
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  } 
}



// Button click for Users comment entry

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);


//  Blog delete

document
  .querySelector('.btn-danger')
  .addEventListener('click', deleteBlog);


