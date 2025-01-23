const form = document.getElementById('generateform');
const qrCode = document.getElementById('qrcode');


const onGenerateSubmit = (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const size = document.getElementById('option').value;

    removeContent();
    if(url === '') {
        const inputUrl = document.getElementById('url');
        inputUrl.classList = 'border-red-200';
    }
    else{
       
        showSpinner();
        setTimeout( () => {
         hideSpinner();
         generateQRCode(url,size);

         setTimeout(() => {
            const saveUrl = qrCode.querySelector('img').src;
            createSaveBtn(saveUrl);
         },50)

        }, 1000);
    }
    
}

const removeContent = () => {
    qrcode.innerHTML = '';
    const saveLink  = document.getElementById('save-link');
    if(saveLink) {
        saveLink.remove();
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode" , {
        text : url,
        width: size, 
        height : size
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = "block";
}; 

const hideSpinner = () => {
    document.getElementById('spinner').style.display = "none";
}


const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 my-5 m-auto';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image'; 
    document.getElementById('generated').appendChild(link);

};

form.addEventListener('submit' , onGenerateSubmit);