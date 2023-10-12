const text = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36"
const idx1 = text.indexOf("(")
const idx2 = text.indexOf(")")
console.log(idx1, idx2)

console.log(
    text.substring(idx1 + 1, idx2)

)