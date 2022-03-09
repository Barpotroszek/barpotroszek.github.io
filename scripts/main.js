window.addEventListener("load", () => {
    window.btn_close = document.getElementById("close");
    console.log(btn_close)
    btn_close.addEventListener("click", ()=> {
        btn_close.parentElement.classList.add("hidden")
    })
    
    document.getElementById("minimalize").addEventListener("click", (e)=> {
        e.target.parentElement.parentElement.classList.toggle("minimalized");
    })
})

const displaySettings = () => {
    btn_close.parentElement.classList.toggle("hidden")
}

const download = () => {
    const canv = document.getElementById("preview");
    const a = document.createElement("a");
    a.href = canv.toDataURL("image/png");
    a.download = prompt("Jak nazwać plik?", "fota z budki") + ".png";
    a.click();
}