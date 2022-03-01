const promise = new Promise((resolve, reject) => {
    // resolve('This is my resolved data');
    setTimeout(() => {
        // resolve('This is my resolved data');
        reject('This is my rejected data');
    }, 5000);
    // reject('This is my rejected data');
});
console.log('Before');
promise
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.log('Error:', error));
console.log('After');