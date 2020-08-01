const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = weatherInput.value;
    msg1.textContent = 'Loading...'
    msg2.textContent = '';
    fetch('/weather?address=' + value)
        .then(response => {
            response.json().then(data => {
                if (data.error)
                    msg1.textContent = data.error;
                else {
                    msg1.textContent = data.location;
                    msg2.textContent = data.forecast;
                }
            });
        });
});

