#!/bin/bash

buildId=$1
namespace=$2

declare -i intent=1
declare -i maxIntent=15

echo "" > podRunning

until ( grep "Running" podRunning ) ; do
	now=$(date)
    echo "[$now] ($intent) check for running..."
    sleep 1
    # for minikube: minikube kubectl -- get pods --selector=build-id=$buildId -n dev >podRunning 2>&1 
    kubectl get pods --selector=build-id=$buildId -n $namespace >podRunning 2>&1 
    intent+=1
    if [[ $intent -gt $maxIntent ]]; then
        echo "maximum attempts reached"    
        exit 1
    fi  
done

echo "Pod is running!!"