var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const colors = ['#fff','#aaa','#777','#333'];

canvas.width =  innerWidth;
canvas.height =  innerHeight;

const clear = () =>{
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}



const stars = [];
for(let i =0; i< 500;i++ ){
    const star = {
        x : Math.floor(Math.random() * canvas.width),
        y : Math.floor(Math.random() * canvas.height),
        color : colors[Math.floor(Math.random() * colors.length)]
    };

    stars.push(star);
}

const paint = () => {
clear();
 for(let i = 0; i< 500; i++){
    const star = stars[i];
    switch(star.color){
        case '#fff' : ctx.lineWidth = 2;
        break;

        case '#aaa' : ctx.lineWidth = 1.8;
        break;

        case '#777' : ctx.lineWidth = 1.5;
            break;

        case '#333' : ctx.lineWidth = 1;
            break
    }
    
    ctx.strokeStyle = star.color;
    ctx.strokeRect(star.x, star.y, 1,1);
    }   
}



const update = () =>{
    for(let i = 0; i< 500; i++){
        const star = stars[i];
        switch(star.color){
            case '#fff' : star.x -= 1;
            break;

            case '#aaa' : star.x -= 0.5;
            break;

            case '#777' : star.x -= 0.3;
                break;

            case '#333' : star.x -= 0.1;
                break
        }
        

        if(star.x < 0){
            star.x = canvas.width;
        }
    }

}


const loop = () =>{
requestAnimationFrame(()=>loop());
update();
paint();
}


loop();