//
// Emscripten��wasm�̓Ǝ��֐���񋟂���T���v���R�[�h
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
// C++�̕��Ƀw�b�_�ƓƎ��֐����쐬���܂��B
// �w�b�_��<emscripten/emscripten.h>�A
// �Ǝ��֐��ɂ͊֐����̑O��EMSCRIPTEN_KEEPALIVE�����āA
// extern "C"�ň݂͂܂��B
//
extern "C" {
    int EMSCRIPTEN_KEEPALIVE addOne() {
        return 1;
    }
}