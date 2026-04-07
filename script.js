   gsap.registerPlugin(SplitText)

// PRIEMIRA COISA -. MAPEAR AS COISAS QUE SER]AO OMTERATIVAS 

   const latasMenores = document.querySelectorAll(" .latas img:nth-child(2)");

   const slides = document.querySelectorAll(".slide");


// SEGMENTAR , ESPECISIFICAR OS ELEMNETOS DE UM GRUPO , NO CASO AS LATAS MENORES = COMANDDO for EACH PARA CADA ELEMENTO DO GRUPO FAZER ALGUMA COISA

// CONTADOR PARA VER QUAL SLIDE ESTÁ ATIVO E QUAL VAI FICAR ATIVO
let contador = 0;

let clicar = true


    latasMenores.forEach(lataMenor=> {
    lataMenor.onclick =() => {
    
        if(clicar) {
            clicar=false;
        // PEGAR O ATRIBUTO "primeiro slide da pagina CLICADA 
        const slideAtivo = document.querySelector(".slide.ativo");
        slideAtivo.classList.remove("ativo");

    // ADICIONAIS IF E ELSE PARA VER SE O CONTADOR CHEGOU NO FINAL DO SLIDE E VOLTAR PARA O INICIO
        if (contador === 3) {
             contador = 0;
    }else { 
        contador = contador +1;
    }

        slides[contador].classList.add("ativo"); 
        animarTitulo();

        setTimeout(() => {
            clicar = true
        }, 1500);

      }
        
    };
 });

  function animarTitulo(){
  const split = SplitText.create(".slide.ativo h2", {
    type: "chars", mask: "chars"
});


   gsap.from(split.chars,{
   y: 100,
   duration:.5,
   stagger: 0.05,
   delay: .5,

});

  }
