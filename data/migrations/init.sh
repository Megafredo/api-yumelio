#~ INITIALIZATION
# Export environnement variable
export PGUSER=postgres

#* 1 - Create user (with login)
# createuser [option_connexion...] [option...] [nom_utilisateur]
createuser -l -P yumelio
# createuser --login --password --pwprompt yumelio

#* 2 - Create database with owner
# createdb [option_connexion...] [option...] [nombase] [description]
createdb -O yumelio yumelio
# createdb --owner=yumelio yumelio

#* 3 - Initialize Sqitch
sqitch init yumelio --engine pg

