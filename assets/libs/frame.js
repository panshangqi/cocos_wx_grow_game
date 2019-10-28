const ip = 'https://mikan.17zuoye.net/game/wechat'
let frame = {}

frame.http = {
    get: function(url, data, fn, err_fn){
        let params = ''
        data.open_id = '+bFckP0YhoS5ZQkZoVK2Jg=='
        for(let key in data){
            params += (params.length == 0) ? '?': '&'
            params += key + '=' + data[key]
        }
        url += params
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && xhr.status == 200){
                let response = xhr.responseText
                if(response){
                    let responseJson = JSON.parse(response)
                    if(typeof fn === 'function'){
                        fn(responseJson)
                    }
                }else{
                    fn(false)
                }
            }else{
                fn(false)
            }
        }
        xhr.open('GET', url, true)
        xhr.send()
    }
}

frame.util = {
    make_url: function(route){
        return ip + route
    }
}
module.exports = {
    frame
}