FROM ldorn/vue-typescript:v1
RUN cd /project && npm i bootstrap bootstrap-vue && npm install three && npm install --save-dev vite-plugin-string
WORKDIR /project
