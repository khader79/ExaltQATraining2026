@echo off
if "%1"=="" (
    robot --outputdir reports tests/
) else (
    robot --outputdir reports tests/%1.robot
)
