marked.setOptions({
    breaks: true,
    gfm: true,
  })
  
function cleanData(userInput) {
    return DOMPurify.sanitize(userInput)
}

const resetBtn = document.getElementById("reset")
const copyBtn = document.getElementById("copy")
const inputField = document.getElementById("input-field")
const outputField = document.getElementById("output-field")

inputField.addEventListener("input", (event) => {
    const inputMD = event.target.value
    const parsed = marked.parse(inputMD)
    const cleanParsed = cleanData(parsed)
    outputField.innerHTML = cleanParsed
})

resetBtn.addEventListener("click", () => {
    inputField.value = ""
    outputField.innerHTML = ""
})

copyBtn.addEventListener("click", async () => {
    try{
        const renderedHTML = outputField.innerHTML
        const renderedText = outputField.innerText

        const html = new Blob([renderedHTML], {type: "text/html"})
        const plain = new Blob([renderedText], {type: "text/plain"})
        const data = [new ClipboardItem({
            "text/html": html,
            "text/plain": plain
        })]

        await navigator.clipboard.write(data)

        copyBtn.textContent = "✅"
        setTimeout(() => {
            copyBtn.textContent = "📋"
        }, 2000)
    } catch (err) {
        console.error("Copying Error", err);
        copyBtn.textContent = "Cannot Copy!"
    }    
})



