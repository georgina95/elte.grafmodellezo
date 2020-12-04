#!/bin/bash
echo ""
echo "Run these commands after a full deploy."
echo ""
set -o allexport; source .env; set +o allexport
cf set-env eltegrafmodellezo-srv CF_API_USER $CF_API_USER
cf set-env eltegrafmodellezo-srv CF_API_PW $CF_API_PW
cf restage eltegrafmodellezo-srv
cf env eltegrafmodellezo-srv | grep CF_API_USER
echo ""
