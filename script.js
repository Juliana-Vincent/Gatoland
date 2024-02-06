document.getElementById("plusLinie").addEventListener("click", function() {
  const linie = document.getElementById("linie");
  const neueLinie = document.createElement("div");
  neueLinie.className = "margo";
  neueLinie.innerHTML = '<input type="text" name="code2">';
  linie.appendChild(neueLinie);
});

var checkboxes = document.querySelectorAll('.tik');
var button = document.getElementById('submitButton');

checkboxes.forEach(ch => {
  ch.addEventListener('change', function() {
    var allChecked = Array.from(checkboxes).every(ch => ch.checked);
    button.disabled = !allChecked;
  });
});
