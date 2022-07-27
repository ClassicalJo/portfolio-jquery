import links from './links.json'
import { onClick } from './onClick'
import { JSONLinks } from './types'

function addOnClick(json: JSONLinks) {
    for(let link in json){
        let element = document.querySelector(`#${link}`)
        onClick(element, json[link])
    }
    
    
}

const Linker = {
    add: () => addOnClick(links as JSONLinks)
}

export default Linker