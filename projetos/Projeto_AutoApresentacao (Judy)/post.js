let mudaLike = document.querySelector(".icone-post");
let like = document.querySelector(".like")

num = 0
mudaLike.addEventListener("click", function(){
    if (num == 0){
        like.setAttribute("src", "/assets/icones/Heart-red.svg")
        num = 1
    }

    else{
        like.setAttribute("src", "/assets/icones/likeNormal.svg")
        num = 0
    }

})

