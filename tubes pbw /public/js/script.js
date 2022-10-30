//cek required
const cekRequired = (event) => {
  const f = event.srcElement;
  if (f.value.length > 0) {
    f.nextElementSibling.style.display = "none";
  } else {
    f.nextElementSibling.style.display = "block";
  }
};
