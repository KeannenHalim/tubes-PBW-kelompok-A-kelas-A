(() => {
  const username_tf = document.querySelector("#username_tf");
  username_tf.addEventListener("keyup", cekRequired);
  const password_pf = document.querySelector("#password_pf");
  password_pf.addEventListener("keyup", cekRequired);
})();
