window.addEventListener("load", () => {
    var btn_close = document.getElementById("close");
    console.log(btn_close)
    btn_close.addEventListener("click", ()=> {
        btn_close.parentElement.classList.add("hidden")
    })
    
    document.getElementById("minimalize").addEventListener("click", (e)=> {
        e.target.parentElement.parentElement.classList.toggle("minimalized");
    })
})

const displaySettings = () => {
    btn_close.parentElement.classList.remove("hidden")
}