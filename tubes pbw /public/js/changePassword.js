let passNew = document.querySelector('[name="passwordNew"]');
let passNewConf = document.querySelector('[name="passwordNewConf"]');
let form = document.querySelector('.form');
let passOld = document.querySelector('[name="passwordOld"]');
let warnIsPendek = document.querySelector('.isPendek');
let warnIsPanjang = document.querySelector('.isPanjang');
let warnIsSama = document.querySelector('.isSama');
let warnIsTidakAda = document.querySelector('.isTidakAda');
let checkPanjang = true;
let checkSama = true;
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let formElements = event.currentTarget.elements;
    const obj = {
        username: formElements[0].value,
        passwordOld: formElements[1].value,
        passwordNew: formElements[2].value
    };
    let init = {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    };

    function showResult(cek) {
        warnIsTidakAda.classList.add('hidden');
        if (cek === 'true') {
            warnIsTidakAda.classList.add('hidden');
            window.location.replace('/');
        } else {
            warnIsTidakAda.classList.remove('hidden');
        }
    };

    function onSuccess(response) {
        return response.json();
    };
    if (checkPanjang === true && checkSama === true) {
        fetch('/changePass', init).then(onSuccess).then(showResult);
    }
})

passNew.addEventListener('input', (e) => {
    let isiPassNew = passNew.value;
    let isiPassNewConf = passNewConf.value;
    if (isiPassNew !== isiPassNewConf) {
        warnIsSama.classList.remove('hidden');
        checkSama = false;
    } else {
        warnIsSama.classList.add('hidden');
        checkSama = true;
    }

    if (isiPassNew.length < 8) {
        warnIsPendek.classList.remove('hidden');
        checkPanjang = false;
    } else {
        warnIsPendek.classList.add('hidden');
        checkPanjang = true;
    }

    if (isiPassNew.length > 12) {
        warnIsPanjang.classList.remove('hidden');
        checkPanjang = false;
    } else {
        warnIsPanjang.classList.add('hidden');
        checkPanjang = true;
    }
});

passNewConf.addEventListener('input', () => {
    let isiPassNew = passNew.value;
    let isiPassNewConf = passNewConf.value;
    if (isiPassNew !== isiPassNewConf) {
        warnIsSama.classList.remove('hidden');
        checkSama = false;
    } else {
        warnIsSama.classList.add('hidden');
        checkSama = true;
    }

    if (isiPassNew.length < 8) {
        warnIsPendek.classList.remove('hidden');
        checkPanjang = false;
    } else {
        warnIsPendek.classList.add('hidden');
        checkPanjang = true;
    }

    if (isiPassNew.length > 12) {
        warnIsPanjang.classList.remove('hidden');
        checkPanjang = false;
    } else {
        warnIsPanjang.classList.add('hidden');
        checkPanjang = true;
    }
});

passOld.addEventListener('input', () => {
    warnIsTidakAda.classList.add('hidden');
})