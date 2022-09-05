#~ VERIFY VERSION
# Export variables d'environnements
export PGUSER=postgres

#* Verify version
#check @HEAD pour indiqué le plus récent
sqitch verify -d yumelio yumelio_v1@HEAD
sqitch verify -d yumelio yumelio_v2@HEAD
sqitch verify -d yumelio yumelio_v3@HEAD
sqitch verify -d yumelio yumelio_v4@HEAD
sqitch verify -d yumelio yumelio_v5@HEAD
sqitch verify -d yumelio yumelio_v6@HEAD
# sqitch verify -d yumelio yumelio_v7
# sqitch verify -d yumelio yumelio_v8
