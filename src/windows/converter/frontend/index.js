let dropArea = document.getElementById('drop-area');
let exportXmlButton = document.getElementById('export-xml-button');
let fileUploadLabel = document.getElementById('file-upload-label');
let xml = null;

[
    'dragenter',
    'dragover',
    'dragleave',
    'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => handleEvent(e, eventName), false)
})

const handleEvent = (e, eventName) => {
    e.preventDefault()
    e.stopPropagation()
    if(eventName === 'dragenter'){
        fileUploadLabel.style.background = `rgba(0,0,0,0.1)`;
    } else if (eventName === 'dragleave'){
        fileUploadLabel.style.background = `rgb(255,255,255)`;
    } else if (eventName === 'drop'){
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles(files)

        fileUploadLabel.style.background = `rgb(255,255,255)`;
    }
}

const handleFiles = (files) => {
    if (files == null || files.length === 0 || files.length > 1 || files[0].type !== 'text/plain'){
        return alert('You can only upload one file at the time with .txt extension');
    }

    const reader = new FileReader()
    reader.onload = event => _validateAndSetXML(event.target.result)
    reader.onerror = error => console.log('Something went wrong.')
    reader.readAsText(files[0]);
}

const clearInputElement = () => {
    document.getElementById('file-upload').value = '';
}

const _validateAndSetXML = (textContent) => {
    try {
        const validationErrorMessage = window.myAPI.Services.getValidationService().ValidatePipedTextRows(textContent);
        if (validationErrorMessage !== null){
            return alert(validationErrorMessage);
        }

        const ConversionService = window.myAPI.Services.getConversionService();

        xml =  ConversionService.ConvertJsonToXML(ConversionService.ConvertPipedTextToJson(textContent));
    } catch (e){
        alert('Something went wrong.');
    } finally {
        _checkState();
    }
}

const _checkState = () => {
    exportXmlButton.disabled = xml === null;
}

const downloadXML = () => {
    const DownloadService = window.myAPI.Services.getDownloadService();
    DownloadService.CreateAndDownloadFile('people.xml', xml)
}


// initialisation
_checkState();
