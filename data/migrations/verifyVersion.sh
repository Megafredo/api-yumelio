#~ VERIFY VERSION
# Export variables d'environnements
export PGUSER=postgres

#* Verify version
sqitch verify -d yumelio yumelio_v1
sqitch verify -d yumelio yumelio_v2
sqitch verify -d yumelio yumelio_v3
# sqitch verify -d yumelio yumelio_v4
# sqitch verify -d yumelio yumelio_v5
# sqitch verify -d yumelio yumelio_v6
# sqitch verify -d yumelio yumelio_v7
# sqitch verify -d yumelio yumelio_v8
