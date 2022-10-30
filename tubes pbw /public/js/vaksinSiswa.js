let PTMT = document.querySelector('#statusPTMT');
let stat = document.querySelector('#stat');
let opt1 = document.createElement('option');
opt1.value = 'ya';
opt1.text = 'YA';
let opt2 = document.createElement('option');
opt2.value = 'tidak';
opt2.text = 'TIDAK';
console.log(stat.textContent);
if(stat.textContent === 'YA'){
    PTMT.remove('option');
    PTMT.appendChild(opt1);
    PTMT.appendChild(opt2);
    
}else{
    PTMT.remove('option');
    PTMT.appendChild(opt2);
    PTMT.appendChild(opt1);
}
PTMT.addEventListener('change', (event) => {
    event.preventDefault();
    if ((PTMT.options[PTMT.selectedIndex].value) === 'ya' || (PTMT.options[PTMT.selectedIndex].value) === 'tidak') {
        const choice = { a: (PTMT.options[PTMT.selectedIndex].value) };
        let init = {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(choice)
        };

        function showResult(cek) {
            console.log(cek)
        };

        function onSuccess(response) {
            return response.json();
        };
        fetch('/siswa/statusPTMT',init).then(onSuccess).then(showResult);
    }
})