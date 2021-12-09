window.onscroll = () => {
    if(scrollY > 50){
        document.querySelector(".navbar").classList.add("shadow-sm");
        return;
    }
    document.querySelector(".navbar").classList.remove("shadow-sm");
}

function toTop(event) {
    event.preventDefault();

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}