USE [TalentOnboarding]
GO
SET IDENTITY_INSERT [dbo].[Customer] ON 
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (1, N'George Campbell', N'10 Bourbon Road')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (2, N'Mary Moses', N'12 Clements Street')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (3, N'Roger Rodriguez', N'California')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (11, N'Richard', N'Naranjo')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (13, N'Edward', N'Scotland')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (21, N'Rodrigo', N'Alajuela, Spain')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (22, N'Mongoose', N'South Africa')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (26, N'Walter', N'San Carlos')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (27, N'Valkyrie', N'Valhalla')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (28, N'Louis ', N'England')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (29, N'Natalia', N'Mernda')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (30, N'Warren', N'San Ramon')
GO
INSERT [dbo].[Customer] ([Id], [Name], [Address]) VALUES (31, N'Monry', N'San Isidro')
GO
SET IDENTITY_INSERT [dbo].[Customer] OFF
GO
SET IDENTITY_INSERT [dbo].[Store] ON 
GO
INSERT [dbo].[Store] ([Id], [Name], [Address]) VALUES (1, N'Le Petite', N'Paris, France')
GO
INSERT [dbo].[Store] ([Id], [Name], [Address]) VALUES (2, N'La Gran', N'Bodega')
GO
INSERT [dbo].[Store] ([Id], [Name], [Address]) VALUES (3, N'Manchesterian', N'Manchuria')
GO
INSERT [dbo].[Store] ([Id], [Name], [Address]) VALUES (6, N'Green Market', N'Greenland')
GO
INSERT [dbo].[Store] ([Id], [Name], [Address]) VALUES (7, N'Capri', N'Italy')
GO
INSERT [dbo].[Store] ([Id], [Name], [Address]) VALUES (8, N'Rebel', N'Georgia')
GO
INSERT [dbo].[Store] ([Id], [Name], [Address]) VALUES (9, N'La Gran Manzana', N'San Ramon')
GO
SET IDENTITY_INSERT [dbo].[Store] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 
GO
INSERT [dbo].[Product] ([Id], [Name], [Price]) VALUES (1, N'Card', 0.4500)
GO
INSERT [dbo].[Product] ([Id], [Name], [Price]) VALUES (2, N'Envelope', 2.0000)
GO
INSERT [dbo].[Product] ([Id], [Name], [Price]) VALUES (3, N'Pen', 5.0000)
GO
INSERT [dbo].[Product] ([Id], [Name], [Price]) VALUES (4, N'Plastic box', 3.0000)
GO
INSERT [dbo].[Product] ([Id], [Name], [Price]) VALUES (7, N'Juggling balls', 8.0000)
GO
INSERT [dbo].[Product] ([Id], [Name], [Price]) VALUES (8, N'Teapot', 10.0000)
GO
INSERT [dbo].[Product] ([Id], [Name], [Price]) VALUES (9, N'UV Torch', 30.0000)
GO
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[Sales] ON 
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (1, 7, 2, 8, CAST(N'2012-09-08' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (2, 2, 1, 2, CAST(N'2019-11-09' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (4, 1, 2, 2, CAST(N'2009-11-23' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (5, 4, 2, 1, CAST(N'2024-02-29' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (8, 3, 1, 1, CAST(N'2007-02-20' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (9, 3, 1, 1, CAST(N'2007-02-20' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (10, 3, 11, 2, CAST(N'2007-02-20' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (14, 2, 11, 6, CAST(N'2024-10-02' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (15, 2, 11, 3, CAST(N'2024-10-02' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (16, 1, 13, 1, CAST(N'2024-07-29' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (17, 4, 3, 6, CAST(N'2024-10-02' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (18, 8, 30, 9, CAST(N'2024-07-09' AS Date))
GO
INSERT [dbo].[Sales] ([Id], [ProductId], [CustomerId], [StoreId], [DateSold]) VALUES (19, 4, 21, 7, CAST(N'2024-10-03' AS Date))
GO
SET IDENTITY_INSERT [dbo].[Sales] OFF
GO
