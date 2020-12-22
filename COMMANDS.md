#### Commands for Build/Deploy to Cloud Foundry(Shared Mode):

# Build Command:
```
cd cloud-cap-multitenancy ; mkdir -p mta_archives ; mbt build -p=cf -t=mta_archives --mtar=eltegrafmodellezo.mtar
```

# Deploy Command:
```
cf deploy mta_archives/eltegrafmodellezo.mtar -f
```

# Subsequent Build+Deploy Commands:
```
mbt build -p=cf -t=mta_archives --mtar=eltegrafmodellezo.mtar ; cf deploy mta_archives/eltegrafmodellezo.mtar -f ; ./CF_CREDS.sh
```

# Undeploy Command:
```
cf undeploy eltegrafmodellezo -f --delete-services
```
