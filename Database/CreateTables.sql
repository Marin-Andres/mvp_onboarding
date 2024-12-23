USE [master]
GO
/****** Object:  Database [TalentOnboarding]    Script Date: 18/09/2024 2:46:15 PM ******/
CREATE DATABASE [TalentOnboarding]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TalentOnboarding', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\TalentOnboarding.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TalentOnboarding_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\TalentOnboarding_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [TalentOnboarding] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TalentOnboarding].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TalentOnboarding] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TalentOnboarding] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TalentOnboarding] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TalentOnboarding] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TalentOnboarding] SET ARITHABORT OFF 
GO
ALTER DATABASE [TalentOnboarding] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TalentOnboarding] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TalentOnboarding] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TalentOnboarding] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TalentOnboarding] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TalentOnboarding] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TalentOnboarding] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TalentOnboarding] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TalentOnboarding] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TalentOnboarding] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TalentOnboarding] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TalentOnboarding] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TalentOnboarding] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TalentOnboarding] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TalentOnboarding] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TalentOnboarding] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TalentOnboarding] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TalentOnboarding] SET RECOVERY FULL 
GO
ALTER DATABASE [TalentOnboarding] SET  MULTI_USER 
GO
ALTER DATABASE [TalentOnboarding] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TalentOnboarding] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TalentOnboarding] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TalentOnboarding] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TalentOnboarding] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TalentOnboarding] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'TalentOnboarding', N'ON'
GO
ALTER DATABASE [TalentOnboarding] SET QUERY_STORE = ON
GO
ALTER DATABASE [TalentOnboarding] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [TalentOnboarding]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 18/09/2024 2:46:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Address] [nvarchar](500) NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Store]    Script Date: 18/09/2024 2:46:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Store](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Address] [nvarchar](500) NULL,
 CONSTRAINT [PK_Store] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sales]    Script Date: 18/09/2024 2:46:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sales](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NOT NULL,
	[CustomerId] [int] NOT NULL,
	[StoreId] [int] NOT NULL,
	[DateSold] [date] NOT NULL,
 CONSTRAINT [PK_Sales] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 18/09/2024 2:46:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Price] [money] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SalesView]    Script Date: 18/09/2024 2:46:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[SalesView]
AS
SELECT  dbo.Sales.Id, dbo.Customer.Name AS Customer, dbo.Product.Name AS Product, dbo.Store.Name AS Store, dbo.Sales.DateSold
FROM   dbo.Sales INNER JOIN
       dbo.Customer ON dbo.Sales.CustomerId = dbo.Customer.Id INNER JOIN
       dbo.Product ON dbo.Sales.ProductId = dbo.Product.Id INNER JOIN
       dbo.Store ON dbo.Sales.StoreId = dbo.Store.Id
GO
ALTER TABLE [dbo].[Sales]  WITH CHECK ADD  CONSTRAINT [FK_Sales_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([Id])
GO
ALTER TABLE [dbo].[Sales] CHECK CONSTRAINT [FK_Sales_Customer]
GO
ALTER TABLE [dbo].[Sales]  WITH CHECK ADD  CONSTRAINT [FK_Sales_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[Sales] CHECK CONSTRAINT [FK_Sales_Product]
GO
ALTER TABLE [dbo].[Sales]  WITH CHECK ADD  CONSTRAINT [FK_Sales_Store] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Store] ([Id])
GO
ALTER TABLE [dbo].[Sales] CHECK CONSTRAINT [FK_Sales_Store]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4[30] 2[40] 3) )"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Sales"
            Begin Extent = 
               Top = 4
               Left = 1309
               Bottom = 363
               Right = 1688
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Customer"
            Begin Extent = 
               Top = 95
               Left = 415
               Bottom = 404
               Right = 794
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Product"
            Begin Extent = 
               Top = 317
               Left = 1844
               Bottom = 626
               Right = 2223
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Store"
            Begin Extent = 
               Top = 412
               Left = 1191
               Bottom = 721
               Right = 1570
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 2330
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SalesView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'SalesView'
GO
USE [master]
GO
ALTER DATABASE [TalentOnboarding] SET  READ_WRITE 
GO
