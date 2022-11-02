const MAX_STARS = 500;
const COLORS = ['#fff','#aaa','#777','#333'];


class StarField extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode : 'open' });
    }

    static get styles(){
        return `
            :host {
                position: fixed;
                inset : 0;
                z-index : -1;
            }

            canvas{
            }
        `;
    }

    
    clear(){
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    }




    init(){
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx    = this.canvas.getContext('2d');

        this.canvas.width =  innerWidth;
        this.canvas.height =  innerHeight;

        this.stars = [];
        for(let i =0; i< MAX_STARS;i++ ){
        const star = {
            x : Math.floor(Math.random() * this.canvas.width),
            y : Math.floor(Math.random() * this.canvas.height),
            color : COLORS[Math.floor(Math.random() * COLORS.length)]
        };

        this.stars.push(star);
        }
        
        this.loop();
    }


    paint(){
        this.clear();
        for(let i = 0; i< MAX_STARS; i++){
            const star = this.stars[i];
            switch(star.color){
                case '#fff' : this.ctx.lineWidth = 2;
                    break;
                case '#aaa' : this.ctx.lineWidth = 1.8;
                    break;
                case '#777' : this.ctx.lineWidth = 1.5;
                    break;
                case '#333' : this.ctx.lineWidth = 1;
                    break
            }
            
            this.ctx.strokeStyle = star.color;
            this.ctx.strokeRect(star.x, star.y, 1,1);
            }   
        }



    update(){
        for(let i = 0; i< MAX_STARS; i++){
            const star = this.stars[i];
            switch(star.color){
                case '#fff' : star.x -= 1;
                    break;
                case '#aaa' : star.x -= 0.5;
                    break;
                case '#777' : star.x -= 0.3;
                    break;
                case '#333' : star.x -= 0.1;
                    break;
            }
            
    
            if(star.x < 0){
                const offset = Math.floor(Math.random() * 200);
                star.x = this.canvas.width + offset;
            }
        }
    
    }
    

    loop(){
        requestAnimationFrame(()=>this.loop());
        this.update();
        this.paint();
    }

    onResize(){
        this.canvas.width =  innerWidth;
        this.canvas.height =  innerHeight;
    }

    connectedCallback (){
        this.render();
        this.init();
        window.addEventListener('resize', () => this.onResize());
    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>${StarField.styles}</style>
            <canvas></canvas>
        `;
    }

}

customElements.define('star-field', StarField);