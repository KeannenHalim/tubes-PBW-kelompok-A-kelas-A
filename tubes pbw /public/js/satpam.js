let elCheck = document.querySelector('.checklist');
let elCross = document.querySelector('.cross');
let form = document.querySelector('.form');
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    let formElements = event.currentTarget.elements;

    const obj = {nis : formElements[0].value};

    let init = {
        method: 'post',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
    };
    
    function showResult(cek){
        console.log(cek);
        elCheck.classList.add('hidden');
        elCross.classList.add('hidden');
        if(cek === 'true'){
            elCheck.classList.remove('hidden');
        }else{
            elCross.classList.remove('hidden');
        }
    };

    function onSuccess(response){
        return response.json();
    };
    fetch('/satpam/cek',init).then(onSuccess).then(showResult);
})