
//
//  index HTML supported procedures
//
import { setFilters, parseDevice } from './hid_control.js';

const checkButton = document.querySelector(`#check-button`);
checkButton.addEventListener(`click`, parseDevice);

// Hook console.X to export both UI and console
"log,warn,error.info".split(",").forEach(function (key) {
    var origin = console[key];

    //overwritten 
    console[key] = function (log) {
        // if(console.development){
        document.getElementById('console_log').innerHTML += log + "<br>";
        origin.apply(console, arguments);
        // }
    };
});

if ("hid" in navigator) {
    // The WebHID API is supported.
    console.log(`WebHID API is supported.`);
} else {
    console.log(`WebHID API is NOT supported. Bye!`);
};


//
// Read file operation
//
let fileInput = document.getElementById('openFile');
let fileReader = new FileReader();
fileInput.onchange = () => {
    let file = fileInput.files[0];
    fileReader.readAsText(file);
};

// fileReader.onload = () => console.log(fileReader.result);
fileReader.onload = function(){
    // console.log(fileReader.result);
    setFilters(convertCSVtoArray(fileReader.result));
};

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        tmp[i] = tmp[i].replace("\r","");
        result[i] = Number(tmp[i].split(','));
    }
 
    return result;
}
 