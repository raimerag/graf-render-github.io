const selectMonedas = document.getElementById("select-monedas")
const btnConvertir = document.getElementById("btn-convertir")
const resultado = document.getElementById("resultado")
const inputMonedas = document.getElementById("input-monedas")
const chartDOM = document.getElementById("myChart").getContext("2d")
const apiURL = "https://mindicador.cl/api/";

async function getMonedas() {
    try {
    const res = await fetch(apiURL);
    const monedas = await res.json();
   return monedas
    }catch(e){
        alert(e.message)
    }
    }

async function renderMonedas() {
        const monedas = await getMonedas();
        const arrayMonedas = Object.values(monedas)
        arrayMonedas.splice(1, 2)
        arrayMonedas.splice(0, 1, {'codigo': 'Seleccionar Moneda'})
     
        let html = "";
    arrayMonedas.forEach((moneda)=>{
            html += `
          <option value="${moneda.valor}" data-role="${moneda.codigo}">${moneda.codigo}</option>
        `
        
    })
    selectMonedas.innerHTML = html

    }
        renderMonedas()

function resultadoConvertor() {
        const nameMoneda = selectMonedas.value
        const valorMonedas= Number(inputMonedas.value)
        if(valorMonedas <= 0){
        alert("ingrese un valor")
        }else if(nameMoneda === "undefined"){
            alert("Seleccione una Moneda")
        }else{
            let convertor = valorMonedas/nameMoneda
            let element=""
            element+=`resultado : ${Number(convertor)}`
            resultado.innerHTML = element
        }
           }
    
         

async function prepararConfiguracionParaLaGrafica() {
const monedaName = selectMonedas.options[selectMonedas.selectedIndex].text
const dataURL = apiURL+monedaName;
        
const res = await fetch(dataURL);
const monedas = await res.json();
const arrayDeMonedas = monedas.serie
      
                
                
const labels = arrayDeMonedas.map(moneda=>{
return moneda.fecha 
})
 const titulo = `${monedaName}`;
 const colorDeLinea = "red";
 const miMoneda = arrayDeMonedas.map((moneda) => {
     return moneda.valor
 });

const datasets= [
    {
    label: titulo,
    backgroundColor: colorDeLinea,
    borderColor: "red",
    data: miMoneda
    } ]
        return {labels, datasets};
    }
                 

async function renderGrafica() {
    const data = await prepararConfiguracionParaLaGrafica()
    const config = {
        type: "line",
        data
        }; 
       new Chart(chartDOM, config)
        
           
    }

    
btnConvertir.addEventListener("click", function(){   
    resultadoConvertor() 
    renderGrafica()
                      
    })
