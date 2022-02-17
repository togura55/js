//
// Emscriptenでwasmの独自関数を提供するサンプルコード
//
//  compiler: em++
//  em++ cmain.cpp  -o hello.wasm -s WASM=1 -s "EXPORTED_FUNCTIONS=['_main', '_hello']"
//

#include <stdio.h>
#include <emscripten/emscripten.h>

//int main(int argc, char** argv) {
int main() {
        //	printf("Hello World\n");
	return 10;
}

//
// C++の方にヘッダと独自関数を作成します。
// ヘッダは<emscripten/emscripten.h>、
// 独自関数には関数名の前にEMSCRIPTEN_KEEPALIVEをつけて、
// extern "C"で囲みます。
//
extern "C" {
    int EMSCRIPTEN_KEEPALIVE addOne() {
        return 1;
    }
}