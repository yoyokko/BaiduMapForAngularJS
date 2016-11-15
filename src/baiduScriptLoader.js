
export const loader = function(ak, offlineOpts, callback) {
    var MAP_URL = `//api.map.baidu.com/api?v=2.0&ak=${ak}&callback=baidumapinit&s=${location.protocol === 'https:' ? 1 : 0}`;
    var HEAT_URL = `//api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js`;

    var baiduMap = window.baiduMap;
    if (baiduMap && baiduMap.status === 'loading') {
        return baiduMap.callbacks.push(callback);
    }

    if (baiduMap && baiduMap.status === 'loaded') {
        return callback();
    }

    window.baiduMap = {status: 'loading', callbacks: []};
    window.baidumapinit = function() {
        function onload(){
            window.baiduMap.status = 'loaded';
            callback();
            window.baiduMap.callbacks.forEach(cb => cb());
            window.baiduMap.callbacks = [];
        };
        var scriptHeat = document.createElement('script');
        scriptHeat.type = 'text/javascript';
        scriptHeat.src = HEAT_URL;
        scriptHeat.onload = onload;
        document.body.appendChild(scriptHeat);
    };

    var createTag = function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = MAP_URL;
        script.onerror = function() {
            Array.prototype
                .slice
                .call(document.querySelectorAll('baidu-map div'))
                .forEach(function(node) {
                    node.style.opacity = 1;
                });
            document.body.removeChild(script);
            setTimeout(createTag, offlineOpts.retryInterval);
        };
        document.body.appendChild(script);
    };

    createTag();
};
