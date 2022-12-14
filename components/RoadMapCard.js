import VanillaTilt from '../vanilla-tilt.js';


class RoadMapCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode : 'open' });
    }

    static get styles(){
        return `
            .card{
                display : grid;
                grid-template-columns: 0.25fr 1fr;
                border: 5px solid var(--color);
                border-radius : 20px;
                text-align: left;
                gap : 0 30px;
                padding : 30px;
                background : linear-gradient(#000b, #0008);
                width : 80vw;
                margin : 0;
                
            }

            .logo{
                max-height : 75px;
                filter: drop-shadow(0 0 10px var(--color));
            }

            .text-conteiner{
                color : #fff;
            }

            h1{
                margin : 0;
            }

            p{
                margin : 0;
                color : #aaa ;
            }

            .image-conteiner{
                display : flex;
                justify-content: center;
                alings-items : center;
                
            }
        `;
    }


    addEfect(){
        const card = this.shadowRoot.querySelector('.card');

        let navegador = navigator.userAgent; // movil
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            VanillaTilt.init(card, { glare : true, "max-glare" : 0.8, gyroscope : true, scale : 1, transition : true});
        }else{ // pc
            VanillaTilt.init(card, { glare : true, "max-glare" : 0.8, scale : 0.9, transition : true, axis : 'x'});
        }
    }

    connectedCallback (){
        this.name = this.getAttribute('name');
        this.description = this.getAttribute('description');
        this.render();
        this.addEfect();
    }

    render(){
        this.shadowRoot.innerHTML = `

            <style>${RoadMapCard.styles}</style>
            <div class="card" >
                <div class="image-conteiner">
                    <img class="logo" src="logos/${this.name}.svg" alt="${this.description}" />
                </div>
                <div class="text-conteiner">
                    <h1>${this.name}</h1>
                    <p>${this.description}</p>
                </div>
            </div>
        `;
    }

}

customElements.define('roadmap-card', RoadMapCard);