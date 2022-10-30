let tombol = document.querySelectorAll('#hapus');
for(let i of tombol){
    let el = i;
    el.addEventListener('click',(event)=>{
        let cek = confirm("Are you sure?");
        if(!cek){
            event.preventDefault();
        }
    });
}