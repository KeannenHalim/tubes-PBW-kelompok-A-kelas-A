let el = document.querySelector('#pilih');
el.addEventListener('click',(e)=>{
    let cek = confirm("Are you sure?");
    if(!cek){
        e.preventDefault();
    }
})