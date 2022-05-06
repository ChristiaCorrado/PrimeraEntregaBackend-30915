
const socket = io.connect();


function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong style="color: blue">${elem.author}</strong>:
            <em style="color: green">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}


socket.on('messages', function(data) { render(data); });

function addMessage(e) {
    const mensaje = {
        author:{ 
            id: document.getElementById('username').value,
            nombre : document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('texto').value
    };
    console.log(mensaje);
    
    socket.emit('new-message', mensaje);
    return false;
}

