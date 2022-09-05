#~ DEPLOY
# Export variables d'environnements
export PGUSER=yumelio
export PGPASSWORD=u*A0E#$!
##* PUT YOUR PASSWORD !!!!!

# https://sqitch.org/docs/manual/sqitch-deploy/
# sqitch deploy [options] [<database>]
# sqitch deploy [options] [<database>] --to-change <change>

# Deploy Global :
sqitch deploy -d yumelio yumelio_v1
sqitch deploy -d yumelio yumelio_v2
sqitch deploy -d yumelio yumelio_v3
sqitch deploy -d yumelio yumelio_v4
sqitch deploy -d yumelio yumelio_v5
# sqitch deploy -d yumelio yumelio_v6
# sqitch deploy -d yumelio yumelio_v7
# sqitch deploy -d yumelio yumelio_v8
# sqitch deploy -d yumelio yumelio_v9
# sqitch deploy -d yumelio yumelio_v10
# sqitch deploy -d yumelio yumelio_v11
# sqitch deploy -d yumelio yumelio_v12
# sqitch deploy -d yumelio yumelio_v13