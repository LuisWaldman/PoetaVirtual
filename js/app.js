// JavaScript source code
let Datos =
{
    poemas: [],
    titulo: "",
    poema: "",
    versos: [],
    rimas: [],
    rimas_asonantes: [],

}

var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
Datos.poema = localStorage[1];

function letrarima(rima)
{
    for (let i = 0; i < Datos.rimas.length; i++)
        if (Datos.rimas[i] == rima)
            return letras[i];
    var id = Datos.rimas.length;
    Datos.rimas[id] = rima;

    return letras[id];
}

function obtenerrima_asonante(rima)
{
    var rima_asonante = '';
    if (rima.includes('a'))
        rima_asonante = 'a';
    if (rima.includes('e'))
        rima_asonante = 'e';
    if (rima.includes('i'))
        rima_asonante = 'i';
    if (rima.includes('o'))
        rima_asonante = 'o';
    if (rima.includes('u'))
        rima_asonante = 'u';
    if (rima.includes('\xe1'))   // A CON ACENTO
        rima_asonante = '\xe1';
    if (rima.includes('\xe9'))  // E CON ACENTO
        rima_asonante = '\xe9';
    if (rima.includes('\xed'))  // I CON ACENTO
        rima_asonante = '\xed';
    if (rima.includes('\xf3'))    // O CON ACENTO
        rima_asonante = '\xf3';
    if (rima.includes('\xfa'))   // U CON ACENTO
        rima_asonante = '\xfa';

    return rima_asonante;
}

function letrarima_asonante(rima)
{
    var rima_asonante = obtenerrima_asonante(rima);



    for (let i = 0; i < Datos.rimas_asonantes.length; i++)
        if (Datos.rimas_asonantes[i] == rima_asonante)
            return letras[i];
    var id = Datos.rimas_asonantes.length;
    Datos.rimas_asonantes[id] = rima_asonante;
    return letras[id];
}





let controlador = {

    CalcularPoema() {
        
        Datos.rimas = [];
        Datos.rimas_asonantes = [];

        Datos.versos = [];
        let ultimo_espacio = ' ';
        var renglones = Datos.poema.split('\n');
        for (var i = 0; i < renglones.length; i++)
        {
            ultimo_espacio = ' ';
            nuevoVerso = {
                total_silabas: 0,
                acento: 0,
                palabras: [],
                espacios: [],
                rima: ''
            }

            while (renglones[i].includes('  '))
                renglones[i] = renglones[i].replace('  ', ' ');
            var palabras = renglones[i].split(' ');

            for (var pi = 0; pi < palabras.length; pi++)
            {
                var palAnalisis = QuitarCaracteresEspeciales(palabras[pi]);
                palabras[pi] = palAnalisis;

                if (palAnalisis != '')
                {
                    var indicePalabra = nuevoVerso.palabras.length;
                    nuePal = silabaJS.getSilabas(palAnalisis);
                    nuevoVerso.palabras[indicePalabra] = nuePal;
                    nuevoVerso.espacios[indicePalabra] = ' ';
                    if (indicePalabra > 0)
                    {

                        if (TerminaConVocal(palabras[indicePalabra - 1]) && EmpiezaConVocal(palabras[indicePalabra])) {
                            if (ultimo_espacio == ' ' || palabras[indicePalabra - 1].length > 1)
                            {
                                nuevoVerso.espacios[indicePalabra - 1] = '_';
                                nuevoVerso.total_silabas--
                                ultimo_espacio = '_'
                            }
                            else
                            {
                                ultimo_espacio = ' '
                            }
                        }
                        else
                        {
                            ultimo_espacio = ' ';
                        }

                    }

                    // Actualizo estadisticas
                    nuevoVerso.total_silabas += nuePal.numeroSilaba
                    nuevoVerso.acento = 0;
                    if (nuePal.acentuacion.startsWith("Agu"))
                        nuevoVerso.acento = +1;
                    if (nuePal.acentuacion.startsWith("E"))
                        nuevoVerso.acento = -1;

                }

            }

            ultimapalabra = nuevoVerso.palabras[nuevoVerso.palabras.length - 1];
            if (ultimapalabra)
            {
                ultimasilaba = ultimapalabra.silabas[ultimapalabra.silabas.length - 1];
                nuevoVerso.rima = letrarima(ultimasilaba.silaba);
                nuevoVerso.rima_asonante = letrarima_asonante(ultimasilaba.silaba);
            }
            Datos.versos[Datos.versos.length] = nuevoVerso;
        }
    }
};
controlador.CalcularPoema();
let app = new Vue({
    el: '#miApp',
    data: Datos,
    methods: {
        calcularPoema: function () {
            controlador.CalcularPoema();
        },
        borrar_panel: function () {
            Datos.poema = '';
            controlador.CalcularPoema();
        }
    }
})