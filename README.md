# Introdução

HUB é um serviço simples que streaming de video.

A ideia é que ao fim desse projeto, seja possivel criar um indexador de arquivos de videos.

- [x] Indexar videos
- [ ] Aplicação WEB - Front-end
- [ ] Player para Front-end
- [ ] Conversão automática de arquivos de video para HLS


# Comandos

Subir serviço - Nativamente o serviço roda no IP do computador, disponibilizando-o todos dispositivos conectados a rede.
```cmd
npm start
```
Exemplo de output:
```cmd
[info] Server running on http://0.0.0.0:80 {}
[info] Initing connection with database! {}
```

----

Subir serviço como cluster
```cmd
npm run cluster
```
Exemplo de output:
```cmd
[info] Worker 1 is online new
[info] Worker 2 is online new
[info] Worker 3 is online new [...]
```

----

Comando para adicionar um novo **Show** para **banco de dados**
```cmd
npm run add:show [Nome do Show] [Caminho pasta dos videos] [Padrão titulo dos videos: ex: S3E{e}]
```

----

[ AINDA NÃO ESTÁ FUNCIONANDO]

Comando para converter arquivos de video para tipo HLS
```cmd
npm run convert
```
