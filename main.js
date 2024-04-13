document.addEventListener('DOMContentLoaded', function() {
  const EMPTY_HEART = '♡';
  const FULL_HEART = '♥';

  const errorModal = document.getElementById('modal');
  errorModal.classList.add('hidden');

  const likeButtons = document.querySelectorAll('.like');

  likeButtons.forEach(likeButton => {
      likeButton.addEventListener('click', function() {
          const isLiked = likeButton.classList.contains('activated-heart');

          mimicServerCall()
              .then(() => {
                  if (isLiked) {
                      likeButton.classList.remove('activated-heart');
                      likeButton.querySelector('.like-glyph').textContent = EMPTY_HEART;
                  } else {
                      likeButton.classList.add('activated-heart');
                      likeButton.querySelector('.like-glyph').textContent = FULL_HEART;
                  }
              })
              .catch(error => {
                  const modalMessage = document.getElementById('modal-message');
                  modalMessage.textContent = error;
                  
                  errorModal.classList.remove('hidden');
                  
                  setTimeout(() => {
                      errorModal.classList.add('hidden');
                  }, 3000);
              });
      });
  });
});

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
      setTimeout(function() {
          let isRandomFailure = Math.random() < .2;
          if (isRandomFailure) {
              reject("Random server error. Try again.");
          } else {
              resolve("Pretend remote server notified of action!");
          }
      }, 300);
  });
}
