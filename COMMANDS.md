#### Commands for Build/Deploy to Cloud Foundry(Shared Mode):

# Build Command:
```
cd cloud-cap-multitenancy ; mkdir -p mta_archives ; mbt build -p=cf -t=mta_archives --mtar=elte_grafmodellezo.mtar
```

# Deploy Command:
```
cf deploy mta_archives/elte_grafmodellezo.mtar -f
```

# Subsequent Build+Deploy Commands:
```
mbt build -p=cf -t=mta_archives --mtar=elte_grafmodellezo.mtar ; cf deploy mta_archives/elte_grafmodellezo.mtar -f ; ./CF_CREDS.sh
```

# Undeploy Command:
```
cf undeploy elte_grafmodellezo -f --delete-services
```
