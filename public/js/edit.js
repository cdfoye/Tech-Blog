const editFormHandler = async (event) => {
  event.preventDefault();
  const postId = document.querySelector('#edit').getAttribute('data-id');
  const content = document.querySelector('#content').value.trim();

  if (content) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
