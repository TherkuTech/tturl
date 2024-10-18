const accordion = document.querySelectorAll('.accordion');

accordion.forEach((accordion) => {
    const icon = accordion.querySelector('.icon');
    const answer = accordion.querySelector('.answer');

    accordion.addEventListener('click', () => {
        if (icon.classList.contains('active')) {
            icon.classList.remove('active');
            answer.style.maxHeight = null;
        } else {
            icon.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});
