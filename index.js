const $ = el => document.querySelector(el)

const container = $('.container')
const result = $('.result')

class Button {
  constructor(props) {
    this.props = props
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    let sym = this.props.text
    if(result.value.includes('ERROR')) {
      result.value = ''
    }
    switch(sym) {
      case 'C': {
        result.value = ''
        break
      }
      case '=': {
        try {
          result.value = (eval(result.value) || 'ERROR')
        }
        catch(e) {
          result.value = 'ERROR'  
        }
        break
      }
      default: {
         result.value += sym
      }
    }
  }
  render() {
    let sym = this.props.text
    let button = document.createElement('button')
    button.textContent = sym == '*' ? 'x' : sym
    button.addEventListener('click', this.onClick)
    
    let className
    if(['+', '-', '/', '*'].includes(sym)) {
      className = 'operator'
    }
    
    button.className = 'button-' + (className || sym)
    return button
  }
}

const layout = [
  '1', '2', '3', '+',
  '4', '5', '6', '-',
  '7', '8', '9', '*',
  'C', '0', '=', '/'
]
layout.forEach(text => {
  let button = new Button({
    text
  })
  container.appendChild(button.render())
})
