#!/bin/sh

set -e

./build.sh

echo "========== Deploying Built Website to Server =========="
scp -r builds/* summationtech@summation.tech:/home/summationtech/summation.tech/
echo "\nDeploy Successful!\n"
