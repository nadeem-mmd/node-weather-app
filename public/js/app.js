//console.log('rendering client side javascript');

// fetch('http://localhost:3000/weather?address=hyderabad')
//     .then(response => {
//         response.json().then(data => {
//             if (data.error)
//                 console.log(error);
//             else {
//                 console.log(data)
//             }
//         });
//     });

const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = weatherInput.value;
    msg1.textContent = 'Loading...'
    msg2.textContent = '';
    fetch('http://localhost:3000/weather?address=' + value)
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

