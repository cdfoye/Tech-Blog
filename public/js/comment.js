const newFormHandler = async (event) => {
  event.preventDefault();

  const postID = event.target.getAttribute('data-id');
  const comment = document.querySelector('#comment').value.trim();

  if (postID && comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ postID, comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/posts/${postID}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/comments');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

document.querySelector('.del-btn').addEventListener('click', delButtonHandler);
