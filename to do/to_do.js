const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');
console.log(gorevListesi);
yeniGorevEkleBtn.addEventListener('click',gorevEkle);
gorevListesi.addEventListener('click',goreviSilTamamla);
document.addEventListener('DOMContentLoaded',localStorageOku);

function goreviSilTamamla(e){
    const tiklananEleman = e.target;
    if(tiklananEleman.classList.contains("gorev-btn-tamamlandi")){
        console.log('Tamam tik');
        tiklananEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }    
    if(tiklananEleman.classList.contains("gorev-btn-sil")){
        console.log('Sil Tik');
        tiklananEleman.parentElement.classList.toggle('kaybol');
        const silinecekGorev = tiklananEleman.parentElement.children[0].innerText;
        localStorageSil(silinecekGorev);
    tiklananEleman.parentElement.addEventListener('transitionend',function(){
            tiklananEleman.parentElement.remove();
        });
        //tiklananEleman.parentElement.remove();
        }
}



function gorevEkle(e){
    e.preventDefault();
    gorevItemiOlustur(yeniGorev.value);
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = '';
}


function localStorageKaydet(yeniGorev){
        let gorevler;

        if(localStorage.getItem('gorevler') === null){
            gorevler = [];
        }
        else{
            gorevler = JSON.parse(localStorage.getItem('gorevler'));
        }

        gorevler.push(yeniGorev);
        localStorage.setItem('gorevler',JSON.stringify(gorevler));
}

function localStorageOku(){
    let gorevler;
    if(localStorage.getItem('gorevler') == null)
        gorevler = [];
    else{
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    gorevler.forEach(function(gorev){
        gorevItemiOlustur(gorev);
    });
}

function gorevItemiOlustur(gorev){
    //div olusturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');
    
    // li olusturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);



    // Tamamlandi butonu ekle
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHtml = '<i class="fas fa-check"></i>';    
    gorevDiv.appendChild(gorevTamamBtn);

    //Silindi Butonu Ekle
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fas fa-trash"></i>'
    gorevDiv.appendChild(gorevSilBtn);
    
    // ul'ye olusturdugumuz divi ekleyelim
    gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev){
    let gorevler;
    if(localStorage.getItem('gorevler') == null)
        gorevler = [];
    else
        gorevler = JSON.parse(localStorage.getItem('gorevler'));    
    
    // splice ile item sil    
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
    }