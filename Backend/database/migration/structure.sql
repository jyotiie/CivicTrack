CREATE TABLE `tb_admins` (
     `admin_id` bigint NOT NULL AUTO_INCREMENT,
     `name` mediumtext NOT NULL,
     `email` mediumtext NOT NULL,
     `country_code` varchar(5) NOT NULL,
     `phone_number` mediumint NOT NULL,
     `password` longtext NOT NULL,
     `role_id` bigint NOT NULL,
     `is_active` tinyint NOT NULL DEFAULT '1',
     `is_registration_completed` tinyint NOT NULL DEFAULT '0',
     `is_deleted` tinyint NOT NULL DEFAULT '0',
     `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (`admin_id`),
     UNIQUE KEY `email` (`email`(500),`country_code`,`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

