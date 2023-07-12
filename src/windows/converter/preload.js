// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron')
let ValidationService = null;
let ConversionService = null;
let DownloadService = null;

contextBridge.exposeInMainWorld('myAPI', {
    Services: {
        getValidationService: ()=>{
            ValidationService = ValidationService || require("../../services/validation-service");
            return ValidationService;
        },
        getConversionService: ()=>{
            ConversionService = ConversionService || require("../../services/conversion-service");
            return ConversionService;
        },
        getDownloadService: ()=>{
            DownloadService = DownloadService || require("../../services/download-service");
            return DownloadService;
        },
    }
})