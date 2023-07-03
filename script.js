// const saveAs = require("./FileSaver")

const generateCertificate = async (name)=>{
    const {PDFDocument, rgb} = PDFLib

    const exBytes = await fetch('./cert.pdf').then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(exBytes)

    const exFont = await fetch('./Sanchez-Regular.ttf').then(res => res.arrayBuffer())

    pdfDoc.registerFontkit(fontkit)

    const sanchezFont = await pdfDoc.embedFont(exFont)

    const page = pdfDoc.getPages()[0]


    page.drawText(name,
        {
            x: 320,
            y: 300,
            size: 38,
            font: sanchezFont,
            color: rgb(0, 0.53, 0.71)
        }
    )

    const uri = await pdfDoc.saveAsBase64({dataUri: true})
    saveAs(uri, `${name}${Date.now()}.pdf`, { autoBom: true })
}

const submitEl = document.getElementById("get-certificate")

console.log(submitEl)
const inputEl = document.getElementById("name")

submitEl.addEventListener("click",()=>{
    const value = inputEl.value
    if(value){
        submitEl.setAttribute("disabled", "disabled");
        generateCertificate(value)
        submitEl.removeAttribute("disabled")
    }
    else{
        alert("please provide a valid name")
    }
    
})

