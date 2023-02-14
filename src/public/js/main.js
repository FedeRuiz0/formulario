async function buttonAdd(obj){
    const pid =  await obj.getAttribute('pid')
    console.log(pid)
}

async function nextPage(obj){
    let params = new URLSearchParams(window.location.search);
    const activePage = parseInt(document.getElementById('page').innerHTML) || 1;

    params.set('page', activePage+1)

    window.location.href = `/products?${params.toString()}`
}

async function prevPage(obj){
    let params = new URLSearchParams(window.location.search);
    const activePage = parseInt(document.getElementById('page').innerHTML) || 1;

    params.set('page', activePage-1)

    window.location.href = `/products?${params.toString()}`
}