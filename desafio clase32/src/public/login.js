const form  = document.getElementById('loginForm');

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/',{
        method:'POST',
        body:JSON.stringify(obj),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        if (json.status === 'success') window.location.replace('/home');
    });
})