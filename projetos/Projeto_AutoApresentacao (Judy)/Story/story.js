class Stories{
    constructor(id){
        this.story = document.querySelector("#conteudo") 
        this.active = 0 // qual slide está ativo
        this.init();
    }
 
    // método para ativar o slide
    ativaSlide(index){
        this.active = index;


        /* IMG STORY */
        this.itens.forEach(item => item.classList.remove('ativo')) // remove
        //item específico
        this.itens[index].classList.add('ativo'); // adiciona classe de ativo
    
        /* BARRA NAV */
        this.BarraNav_itens.forEach(item => item.classList.remove('ativo')) // remove
        //item específico
        this.BarraNav_itens[index].classList.add('ativo'); // adiciona classe de ativo
    
        this.autoSlide();
    }

    prev(){
        if (this.active > 0){
            this.ativaSlide(this.active - 1)
        }
        // else: 
        //      if(for o primeiro "usuario"){reinicia tempo do story}
        //      volta para o "usuario" anterior (no último storys)
        
    }

    next(){      
        if (this.active < this.itens.length - 1){
            this.ativaSlide(this.active + 1)
        }
        //else{ //voltando ao primeiro story *** (alterar para minha funcionalidade)
            //this.ativaSlide(0)
            
            // leva a página anterior
        //}
    }

    addNavigator(){
        const btnNext = this.story.querySelector(".story-next")
        const btnPrev = this.story.querySelector(".story-prev")

        btnNext.addEventListener('click', this.next) // clique ao btn next
        btnPrev.addEventListener('click', this.prev)

    }

    addBarraNav(){
        this.itens.forEach( () => this.barraNav.innerHTML += "<article></article>" )
        this.BarraNav_itens =  Array.from(this.barraNav.children) // para conseguir utilizar os métodos de array, por exemplo o ForEach 
    }

    autoSlide(){
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.next, 5000)
        
    }

    init(){
         //todos os itens 
        this.itens = this.story.querySelectorAll(".itens-story > *") // > * = todo elemento 'filho'
        this.barraNav = this.story.querySelector(".barra-nav")
        
        this.addBarraNav()
        this.ativaSlide(0)
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this)
        this.addNavigator();

        this.autoSlide();
    }
}

new Stories('story');