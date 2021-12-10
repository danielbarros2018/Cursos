document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#btnTransform").addEventListener('click', function () {
        let texto = document.querySelector('#txtEntrada').value;
        let div = document.querySelector('#result').innerHTML = maiusc(texto);
    })

    function maiusc(text) {
        return text.toUpperCase();
    }

})