export default function callLoading(text, callback, callBackParam) {
    const spinner = document.querySelector('.loading-overlay')
    const content = document.querySelector('.loading-overlay-content')
    spinner.classList.add('show')
    content.innerHTML = text
    setTimeout(() => {
        spinner.classList.remove('show');
        callback(callBackParam);
    }, 2000)
}