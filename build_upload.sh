#!/bin/bash

echo "Build and Upload React APP to S3 bucket"
npm run build:prod && aws s3 sync build/ s3://hello-world.com

echo "Generate and Upload graphics to Image folder"
go run ~/aws/stack/golang/graphics/draw_upload_s3.go
