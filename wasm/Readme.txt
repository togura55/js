Windows環境での開発、ビルドを想定

<準備>
emsdk, pythonのインストール。

<手順>
1. ¥emsdk¥emcmdprompt.batを実行してEmscripten実行の環変数境設定を行います。

2. プロジェクトフォルダに移動して、em++コンパイラを実行します。ソースコードファイル名、生成されるwasmファイル名、アンダースコアを付けたエクスポート関数名、を指定します。例；
em++ hello.cpp  -o hello.wasm -s WASM=1 -s "EXPORTED_FUNCTIONS=['_main', '_addOne']"

3. 呼び出し元のHTML/JavaScriptを作成。例：my_hello.html

4. python Webサーバーからhtmlを起動する。例：server_sample.py

5. 開発者ツールで呼び出された.wasmのソースを表示させ、import...の部分をコピーする（インポート設定情報）
 (import "wasi_snapshot_preview1" "proc_exit") (param i32))

6. JS内でimportObjectにインポート設定情報を設定する。
var importObject = { wasi_snapshot_preview1: { proc_exit: arg => console.log(arg) } };

7. JS内のインポート後の情報はobjに格納されているため、obj.instance.exports.関数名()でC++の関数を実行して、戻り値を処理するコードを書く



<注記>
VSCode Live Serverでは wasm呼び出しに対してMIME type エラーが出て実行できない。Headersにapplication/wasmをセットする方法が不明。[As of 11/2021]

