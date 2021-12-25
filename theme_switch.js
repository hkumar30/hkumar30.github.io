console.log('Its Working')

let theme = localStorage.getItem('theme')

if(theme == null){
    setTheme('light')
}

else{
    setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')

for(var i = 0; themeDots.length > i; i++){
    themeDots[i].addEventListener('click', function(){
        setTheme(this.dataset.mode);
    })
}

function setTheme(mode){
    console.log('Option Clicked:', mode)

    if (mode == 'dark' || mode === 'green' || mode === 'purple') {
        document.getElementById('theme-style').href = 'modes/'+ mode +'.css';
    } else {
        document.getElementById('theme-style').href = 'def.css';
    }

    localStorage.setItem('theme', mode)
}