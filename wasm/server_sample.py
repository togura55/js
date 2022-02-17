
import http.server
import socketserver

Handler = http.server.SimpleHTTPRequestHandler

# MIME Typeに'application/wasm'を追加
Handler.extensions_map['.wasm'] = 'application/wasm'
with socketserver.TCPServer(("", 8080), Handler) as httpd:
    print("サーバ起動 port", 8080)
    httpd.serve_forever()