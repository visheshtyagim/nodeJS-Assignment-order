CREATE DATABASE vishesh;

CREATE TABLE `account` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `firstname` varchar(255) DEFAULT '',
  `lastname` varchar(255) DEFAULT '',
  `customer_type` tinyint(4) NOT NULL DEFAULT '1',
  `phone` varchar(255) DEFAULT '',
  `address` text,
  `info` text,
  `status` tinyint(3) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status_email` (`status`,`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `order` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `status` tinyint(3) NOT NULL DEFAULT '0',
  `customer_id` bigint(20) unsigned NOT NULL,
  `subtotal` bigint(20) unsigned DEFAULT '0',
  `discount` bigint(20) unsigned DEFAULT '0',
  `shipping_charges` bigint(20) unsigned DEFAULT '0',
  `payment_status` tinyint(4) unsigned NOT NULL,
  `promo_code` varchar(255) DEFAULT NULL,
  `promo_description` varchar(255) DEFAULT NULL,
  `grandtotal` bigint(20) unsigned DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id_idx` (`customer_id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `order_item` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` bigint(20) unsigned NOT NULL,
 `product_id` int(12) unsigned DEFAULT NULL,
 `vertical_id` int(12) unsigned DEFAULT NULL,
 `merchant_id` int(12) unsigned NOT NULL,
 `sku` varchar(255) DEFAULT NULL,
 `name` varchar(255) DEFAULT NULL,
 `status` tinyint(4) unsigned NOT NULL DEFAULT '1',
 `qty_ordered` smallint(5) unsigned DEFAULT '0',
 `fulfillment_service` int(12) unsigned DEFAULT '0',
 `promo_code` varchar(255) DEFAULT NULL,
 `promo_description` varchar(255) DEFAULT NULL,
 `mrp` bigint(20) unsigned DEFAULT '0',
 `price` bigint(20) unsigned DEFAULT '0',
 `conv_fee` bigint(20) unsigned DEFAULT '0',
 `discount` bigint(20) unsigned DEFAULT '0',
 `selling_price` bigint(20) unsigned DEFAULT '0',
 `shipping_charges` bigint(20) unsigned DEFAULT '0',
 `ship_by_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_item_order_id` (`order_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_merchant_id` (`merchant_id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `inventory` (
 `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
 `product_id` int(12) unsigned NOT NULL,
 `qty` int(12) unsigned DEFAULT '0',
 `warehouse_id` int(12) unsigned DEFAULT '0',
 `status` tinyint(3) unsigned DEFAULT '1',
 `valid_from` datetime DEFAULT NULL,
 `valid_upto` datetime DEFAULT NULL,
 `manage_stock` tinyint(3) unsigned NOT NULL DEFAULT '1',
 `max_dispatch_time` tinyint(3) unsigned DEFAULT '3',
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `idx_product_id` (`product_id`,`warehouse_id`),
 KEY `idx_inv_product_id` (`product_id`), 
 KEY `idx_warehouse_id` (`warehouse_id`),
ENGINE=InnoDB DEFAULT CHARSET=utf8