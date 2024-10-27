# См. статью по ссылке https://aka.ms/customizecontainer, чтобы узнать как настроить контейнер отладки и как Visual Studio использует этот Dockerfile для создания образов для ускорения отладки.

# Этот этап используется при запуске из VS в быстром режиме (по умолчанию для конфигурации отладки)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

RUN apt-get update && apt-get install -y default-jre

RUN apt-get install -y wget gpg && wget -O- https://repo.liquibase.com/liquibase.asc | gpg --dearmor > liquibase-keyring.gpg && \
	cat liquibase-keyring.gpg | tee /usr/share/keyrings/liquibase-keyring.gpg > /dev/null && \
	echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/liquibase-keyring.gpg] https://repo.liquibase.com stable main' | tee /etc/apt/sources.list.d/liquibase.list

RUN apt-get update && apt-get install liquibase -y

WORKDIR /app
EXPOSE 8080


# Этот этап используется для сборки проекта службы
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["LiquibaseAdmin/LiquibaseAdmin.csproj", "LiquibaseAdmin/"]
RUN dotnet restore "./LiquibaseAdmin/LiquibaseAdmin.csproj"
COPY . .
WORKDIR "/src/LiquibaseAdmin"
RUN dotnet build "./LiquibaseAdmin.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этот этап используется для публикации проекта службы, который будет скопирован на последний этап
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LiquibaseAdmin.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false


FROM node:current-alpine3.18 AS frontend-build
WORKDIR /app
COPY ./LiquibaseAdminFrontend .
RUN npm i
RUN npm run build


# Этот этап используется в рабочей среде или при запуске из VS в обычном режиме (по умолчанию, когда конфигурация отладки не используется)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=publish /src/LiquibaseAdmin/appConfig appConfig
COPY --from=frontend-build /app/dist wwwroot/.
ENTRYPOINT ["dotnet", "LiquibaseAdmin.dll"]
