# globe-customer-ui
### DEPLOY 

Os deploys serão feitos na máquina **cvdigital01.atsglobe.local**
O acesso a essa máquina via *FTP* e/ou *SSH* é feito com a chave *.pem* com seu nome de usuário

Após instalar as dependencias necessárias com o comando:
```sh
$ npm install
```
**SANDBOX**
Apontará para a API do ambiente de homologação
```sh
$ npm run build-sandbox
```


**PROD**
Apontará para a API do ambiente de produção

```sh
$ npm run build-prod
```

Após o build, será gerado o diretório **dist**
Em seguida, geramos um zip desse diretório:

```sh
$ zip -r dist.zip dist
```

Após gerar o zip, fazer o upload via FTP no host **cvdigital01.atsglobe.local**, no diretório:

### GUIDE
Para acessar a documentação do guide do projeto acesse localhost:4200/guide

**PROD**: /var/www/backoffice.atsglobe.com/

**SANDBOX**: /var/www/sandbox-backoffice.atsglobe.com/

Após upload, acessar a máquina via SSH, fazer o backup da versão anterior(se necessário), e descopactar a nova versão:

```sh
$ cd /var/www/<diretório desejado>
$ sudo rm -rf dist_bkp && sudo mv dist dist_bkp && sudo unzip  dist.zip
