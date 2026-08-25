USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'CatalogDB')
    CREATE DATABASE CatalogDB;
GO

USE CatalogDB;
GO
