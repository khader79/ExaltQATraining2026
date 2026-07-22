@echo off
setlocal

set SUITE=%1
set TAG=%2

if "%SUITE%"=="" (
    if "%TAG%"=="" (
        echo Running all tests...
        robot --outputdir reports tests/
    ) else (
        echo Running tests with tag: %TAG%
        robot --outputdir reports --include %TAG% tests/
    )
) else (
    if "%TAG%"=="" (
        echo Running suite: %SUITE%
        robot --outputdir reports tests/%SUITE%.robot
    ) else (
        echo Running suite: %SUITE% ^| tag: %TAG%
        robot --outputdir reports --include %TAG% tests/%SUITE%.robot
    )
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Reports generated in: reports\
) else (
    echo.
    echo Tests failed. Check reports\ for details.
)

endlocal
