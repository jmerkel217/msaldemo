# @if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off


WORKING_DIR=$PWD
echo Working Directory $WORKING_DIR
# ----------------------
# KUDU Deployment Script
# Version: 1.0.17
# ----------------------

# Prerequisites
# -------------

# Verify node.js installed
#where node 2>nul >nul
#IF %ERRORLEVEL% NEQ 0 (
#  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
#  goto error
#)

# Setup
# -----

#setlocal enabledelayedexpansion

#set ARTIFACTS=%~dp0%..\artifacts

DEPLOYMENT_SOURCE=/home/site
echo Deployment Source $DEPLOYMENT_SOURCE
#if NOT DEFINED DEPLOYMENT_SOURCE (
#  SET DEPLOYMENT_SOURCE=%~dp0%.
#)

DEPLOYMENT_TARGET=/home/site/wwwroot
echo Deployment Target $DEPLOYMENT_TARGET
#if NOT DEFINED DEPLOYMENT_TARGET (
#  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
#)

#NEXT_MANIFEST_PATH=$DEPLOYMENT_SOURCE/manifest
#echo $NEXT_MANIFEST_PATH
#IF NOT DEFINED NEXT_MANIFEST_PATH (
#  SET NEXT_MANIFEST_PATH=%ARTIFACTS%\manifest

#  IF NOT DEFINED PREVIOUS_MANIFEST_PATH (
#    SET PREVIOUS_MANIFEST_PATH=%ARTIFACTS%\manifest
#  )
#)

#IF NOT DEFINED KUDU_SYNC_CMD (
  # Install kudu sync
echo Installing Kudu Sync
npm install kudusync -g --silent
#  IF !ERRORLEVEL! NEQ 0 goto error

  # Locally just running "kuduSync" would also work
#  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
#)
#goto Deployment

# Utility Functions
# -----------------

#:SelectNodeVersion

#IF DEFINED KUDU_SELECT_NODE_VERSION_CMD (
  # The following are done only on Windows Azure Websites environment
#  call %KUDU_SELECT_NODE_VERSION_CMD% "%DEPLOYMENT_SOURCE%" "%DEPLOYMENT_TARGET%" "%DEPLOYMENT_TEMP%"
#  IF !ERRORLEVEL! NEQ 0 goto error

#  IF EXIST "%DEPLOYMENT_TEMP%\__nodeVersion.tmp" (
#    SET /p NODE_EXE=<"%DEPLOYMENT_TEMP%\__nodeVersion.tmp"
#    IF !ERRORLEVEL! NEQ 0 goto error
#  )
  
#  IF EXIST "%DEPLOYMENT_TEMP%\__npmVersion.tmp" (
#    SET /p NPM_JS_PATH=<"%DEPLOYMENT_TEMP%\__npmVersion.tmp"
#    IF !ERRORLEVEL! NEQ 0 goto error
#  )

#  IF NOT DEFINED NODE_EXE (
#    SET NODE_EXE=node
#  )

#  SET NPM_CMD="!NODE_EXE!" "!NPM_JS_PATH!"
#) ELSE (
#  SET NPM_CMD=npm
#  SET NODE_EXE=node
#)

#goto :EOF

#################################################################
# Deployment
# ----------

#:Deployment
#echo Handling node.js deployment.

# 1. KuduSync
#IF /I "%IN_PLACE_DEPLOYMENT%" NEQ "1" (
  #call :ExecuteCmd "%KUDU_SYNC_CMD%" -v 50 -f "%DEPLOYMENT_SOURCE%" -t "%DEPLOYMENT_TARGET%" -n "%NEXT_MANIFEST_PATH%" -p "%PREVIOUS_MANIFEST_PATH%" -i ".git;.hg;.deployment;deploy.cmd"
#  IF !ERRORLEVEL! NEQ 0 goto error
#)

# 2. Select node version
#call :SelectNodeVersion

# 3. Install npm packages
#IF EXIST "%DEPLOYMENT_TARGET%\package.json" (
#  pushd "%DEPLOYMENT_TARGET%"
#  call :ExecuteCmd !NPM_CMD! install --production
#  IF !ERRORLEVEL! NEQ 0 goto error
#  popd
#)

#perform the npm install
if test ! -f $DEPLOYMENT_TARGET/package.json
then
  cp *.json $DEPLOYMENT_TARGET/.
  cd $DEPLOYMENT_TARGET
  npm install --production
  cd $WORKING_DIR
else
  cd $DEPLOYMENT_TARGET
  npm install --production
  cd $WORKING_DIR
fi

#perform the npm build
echo running ng build with output path of $DEPLOYMENT_TARGET
  ng build --output-path $DEPLOYMENT_TARGET --progress

#################################################################
#goto end

# Execute command routine that will echo out when error
#:ExecuteCmd
#setlocal
#set _CMD_=%*
#call %_CMD_%
#if "%ERRORLEVEL%" NEQ "0" echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
#exit /b %ERRORLEVEL%

#:error
#endlocal
#echo An error has occurred during web site deployment.
#call :exitSetErrorLevel
#call :exitFromFunction 2>nul

#:exitSetErrorLevel
#exit /b 1

#:exitFromFunction
#()

#:end
#endlocal
echo Finished successfully.
