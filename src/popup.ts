import * as $ from 'jquery'

$(document).ready(() => {
  $.getJSON('https://api.giphy.com/v1/gifs/trending?limit=3&api_key=dc6zaTOxFJmzC&offset=' + Math.floor(Math.random() * 1000), (data) => {
    $('img').each((i, el) => {
      $(el).attr('src', data.data[i].images.fixed_width.url)
      $(el).unbind().click(() => {
        var text = "![LGTM](" + $(el).attr('src') + ")"
        var clipboard = $('<input/>')
        $('body').append(clipboard)
        clipboard.val(text).select()
        document.execCommand('copy')
        clipboard.remove()
      })
    })
  })
})
