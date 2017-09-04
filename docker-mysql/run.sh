# -i              : Keep STDIN open even if not attached
# -t              : Allocate a pseudo-tty
# -d              : DETACHED MOD

docker kill dgendillmysql-c
docker rm dgendillmysql-c
docker run -it -v $(pwd)/database:/database -p 3306:3306 \
       --name dgendillmysql-c -d dgendillmysql
       