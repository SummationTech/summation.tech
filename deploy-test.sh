#!/bin/sh

set -e

./build.sh

echo "========== Deploying Built Website to Server Test Directory =========="
scp -r builds/* summationtech@summation.tech:/home/summationtech/summation.tech/test
echo "\nDeploy Successful!\n"
