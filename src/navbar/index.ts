function clickOutside() {
    document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as Element
        let isOutside = !target.closest("#nav")
        let toggler = document.querySelector(".navbar-toggler")
        let navbar = document.querySelector("#navbarNavAltMarkup")
        if (isOutside && navbar?.classList.contains("show")) toggler?.dispatchEvent(new Event('click'))
    })
}

const navbar = {
    closeWhenClickingOutside: () => clickOutside()
}
export default navbar