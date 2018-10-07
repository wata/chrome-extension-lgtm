document.addEventListener('DOMContentLoaded', async () => {
  const imageURLs = await fetchImageURLs()
  for (const imagePromise of imageURLs.map(loadImage)) {
    const img = await imagePromise
    document
      .getElementById('content')
      .appendChild(document.createElement('li'))
      .appendChild(img)
  }
}, false)

async function fetchImageURLs(): Promise<[string]> {
  const url = 'https://api.giphy.com/v1/gifs/trending?limit=3&api_key=dc6zaTOxFJmzC&offset=' + Math.floor(Math.random() * 1000)
  const res = await fetch(url)
  const json = await res.json()
  return json.data.map(item => item.images.fixed_width.url)
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image(200)
    image.onload = () => resolve(image)
    image.onerror = () => reject()
    image.onclick = () => {
      const input = document.createElement('input')
      input.value = `![LGTM](${url})`
      document.body.appendChild(input).select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    image.src = url
  })
}
