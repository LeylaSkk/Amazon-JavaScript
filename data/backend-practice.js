const xhr = new XMLHttpRequest();
//load means the rsponse has loaded
xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});

//xhr.open('GET', 'https://supersimplebackend.dev/products');
xhr.open('GET', 'https://supersimplebackend.dev/products');
xhr.send();//asynchronous code cause it doesnt wait for the request to be sent it goes through the next line straight away

