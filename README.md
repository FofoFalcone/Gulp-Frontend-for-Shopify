Prima di procedere all'inizio del progetto sulla macchina locale,
è bene seguire i passaggi per iniziare ad utilizzare gulp al seguente URL:

- https://gulpjs.com/docs/en/getting-started/quick-start

Per utilizzare Gulp su questo progetto è necessario installare specifici pacchetti NPM.
Nel file package.json sono già stati elencati i pacchetti NPM necessari all'avvio di Gulp sul progetto.
Ad ogni nuova installazione in locale del progetto basterà eseguire nel terminale il comando

 - npm i

per installare i pacchetti NPM

Una volta installati, usare il comando 

 - npm run dev

In un terminale a parte, per collegare il proprio ambiente allo store Shopify

  - gem install shopify-cli
  - shopify login --store STORE_URL

Se è la prima installazione in locale, usare il comando

  - shopify theme pull

e seguire le istruzioni fornite dal comando.
Una volta terminate le modifiche, interrompere il comando "npm run dev" ed usare 

  - npm run build

e pushare i file corretti nel tema online

  - shopify theme push
