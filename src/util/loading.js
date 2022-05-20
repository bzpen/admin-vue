let loading;
import ElementUI from 'element-ui';
function startLoading() {
    loading = ElementUI.Loading.service({
        lock: true,
        text: "加载中...",
        background: 'rgba(0,0,0,0.2)'
    })
}

function endLoading() {
    loading.close()
}
export default{
    endLoading,
    startLoading
}