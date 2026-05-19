 gsap.registerPlugin(SplitText, ScrollTrigger);

// 1. MAPEAMENTO DE ELEMENTOS
const latasMaiores = document.querySelectorAll(".latas img:nth-child(1)");
const latasMenores = document.querySelectorAll(".latas img:nth-child(2)");
const slides = document.querySelectorAll(".slide");

// NOVOS ELEMENTOS: Setas e Retângulo Viajante
const arrowPassar = document.getElementById("arrow-passar");
const arrowVoltar = document.getElementById("arrow-voltar");
const retanguloAtivo = document.getElementById("Rectangle130");

let contador = 0;
let clicar = true;

// 2. CONFIGURAÇÃO DOS CLIQUES (LATAS)
latasMenores.forEach(lata => {
    lata.onclick = () => {
        if (clicar) {
            clicar = false;
            mudarSlide(1);
        }
    };
});

latasMaiores.forEach(lata => {
    lata.onclick = () => {
        if (clicar) {
            clicar = false;
            mudarSlide(-1);
        }
    };
});

// 3. CONFIGURAÇÃO DOS CLIQUES (SETAS)
if (arrowPassar) {
    arrowPassar.onclick = () => {
        if (clicar) {
            clicar = false;
            mudarSlide(1);
        }
    };
}

if (arrowVoltar) {
    arrowVoltar.onclick = () => {
        if (clicar) {
            clicar = false;
            mudarSlide(-1);
        }
    };
}

// 4. FUNÇÃO MESTRE PARA TROCAR O SLIDE
function mudarSlide(direcao) {
    const slideAtivo = document.querySelector(".slide.ativo");
    slideAtivo.classList.remove("ativo");

    contador = contador + direcao;


    if (contador > 3) {
        contador = 0;
    } else if (contador < 0) {
        contador = 3;
    }

    slides[contador].classList.add("ativo");
    
    // CHAMADA DAS ANIMAÇÕES
    animarPaginacao(); // Move o retângulo
    animarTitulo();    // Faz o efeito no H2

    setTimeout(() => {
        clicar = true;
    }, 1500);
}

function animarPaginacao() {
    const container = document.querySelector('.paginacao');
    const retangulo = document.getElementById('Rectangle130');
    const bolinhas = document.querySelectorAll('.ponto-inativo');

    // Essa linha move o retângulo fisicamente para a posição do 'contador'
    // O Flexbox do CSS cuida de empurrar as bolinhas para o lado automaticamente
    if (contador === 0) {
        container.prepend(retangulo); // Coloca no início
    } else {
        // Coloca o retângulo após a bolinha correspondente
        container.insertBefore(retangulo, container.children[contador + 1]);
    }

    // Animação de "transformação" para ficar fluido
    gsap.from(retangulo, {
        width: 12, // Ele parece que cresceu de uma bolinha
        duration: 0.4,
        ease: "power2.out"
            });
        }
    

function animarTitulo() {
    const split = SplitText.create(".slide.ativo h2", {
        type: "chars", 
        mask: "chars"
    });

    gsap.from(split.chars, {
        y: 100,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.5,
    });
}

// 6. ANIMAÇÃO DO LETREIRO NO SCROLL
gsap.to("#textoPath", {
    scrollTrigger: {
        trigger: ".letraMovimento",
        start: "top bottom", 
        end: "bottom top",    
        scrub: 2, 
    },
    attr: { startOffset: "-35%" } 
});


// CAMINHO EM S — nasce e morre com o scroll
const trilha = document.getElementById("trilha");
const comprimento = trilha.getTotalLength();

// Configura o path invisível no início
gsap.set(trilha, {
    strokeDasharray: comprimento,
    strokeDashoffset: comprimento,
});

// Anima conforme o scroll
gsap.to(trilha, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".container-flutuantes",
        start: "top 65%",
        end: "bottom 10%",
        scrub: 2.8,
        
    }

});

// ============================================
// ANIMAÇÃO DAS LATAS FLUTUANTES
// ============================================
   
const lataPresunto = document.querySelectorAll(".lata-img")[0];
const lataPaprica = document.querySelectorAll(".lata-img")[1];
const lataCebola = document.querySelectorAll(".lata-img")[2];

console.log("Lata Presunto:", lataPresunto);
console.log("Lata Páprica:", lataPaprica);
console.log("Lata Cebola:", lataCebola);

gsap.fromTo(lataPresunto, 
    {
        rotation: 0,
        y: 50,
        opacity: 0.3
    },
    {
        rotation: 15,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".lata-presunto",
            start: "top 80%",
            end: "top 30%",
            scrub: 1.5,
        }
    }
);

gsap.fromTo(lataPaprica, 
    {
        rotation: 0,
        y: 50,
        opacity: 0.3
    },
    {
        rotation: -15,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".lata-paprica",
            start: "top 80%",
            end: "top 30%",
            scrub: 1.5,
        }
    }
);

gsap.fromTo(lataCebola, 
    {
        rotation: 0,
        y: 50,
        opacity: 0.3
    },
    {
        rotation: 15,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".lata-cebola",
            start: "top 80%",
            end: "top 30%",
            scrub: 1.5,
        }
    }
);


// ============================================
// 🎨 DEGRADÊ SUAVE DAS CORES DAS LATAS
// ============================================

// Cores das latassegurançadadosdadoscelua
const corPresunto = "#cf2c32";    // Vermelho
const corPaprica = "#ca7c1c";     // Laranja
const corCebola = "#134e13";      // Verde

// ANIMAÇÃO 1: Branco → Vermelho (Presunto)
gsap.to("body", {
    backgroundColor: corPresunto,
    duration: 1,
    scrollTrigger: {
        trigger: ".lata-presunto",
        start: "top 60%",
        end: "top 30%",
        scrub: 2,
    }
});

// ANIMAÇÃO 2: Vermelho → Laranja (Páprica)
gsap.to("body", {
    backgroundColor: corPaprica,
    duration: 1,
    scrollTrigger: {
        trigger: ".lata-paprica",
        start: "top 60%",
        end: "top 30%",
        scrub: 2,
    }
});

// ANIMAÇÃO 3: Laranja → Verde (Cebola)
gsap.to("body", {
    backgroundColor: corCebola,
    duration: 1,
    scrollTrigger: {
        trigger: ".lata-cebola",
        start: "top 60%",
        end: "top 30%",
        scrub: 2,
    }
});

// BÔNUS: Voltar ao Branco (após latas)
gsap.to("body", {
    backgroundColor: "#bdacac",
    duration: 1,
    scrollTrigger: {
        trigger: ".container-flutuantes",
        start: "bottom 30%",
        end: "bottom 0%",
        scrub: 2,
    }
});













// ============================================
// 🎬 ANIMAÇÃO DO FOOTER - 2 COLUNAS LADO A LADO
// BLUR TO SHARP + SCALE + COLORS
// ============================================

gsap.registerPlugin(ScrollTrigger);

const footerPortfolio = document.querySelector(".footer-portfolio");

// ============================================
// ANIMAR CONFORME SCROLL
// ============================================

gsap.to(footerPortfolio, {
    scrollTrigger: {
        trigger: ".footer-portfolio",
        start: "top 80%",
        end: "top 40%",
        onEnter: () => {
            // Animações já começam pelo CSS
        }
    }
});

console.log("✅ Footer 2 Colunas com BLUR TO SHARP animado com sucesso!");