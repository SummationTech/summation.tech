#!/bin/sh

set -e

./build.sh

echo ""
echo "========== Deploying Built Website to Server =========="
scp -rv builds/* summationtech@summation.tech:/home/summationtech/summation.tech/
echo ""
echo "Deploy Successful!"
