class Api {
    constructor(options ){
        this._options = options;
        this._baseUrl = options.baseUrl;
        this._headers = {headers: options.headers};
        this._headersGet ={
            method: 'GET',
            headers: options.headers
        };
        this._headersPatch ={
            method: 'PATCH',
            headers: options.headers
        };
        this._headersPost ={
            method: 'POST',
            headers: options.headers
        };
        this._headersPut ={
            method: 'PUT',
            headers: options.headers
        };
        this._headersDelete ={
            method: 'DELETE',
            headers: options.headers
        };
    }
    
}